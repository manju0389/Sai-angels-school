
"use client";

import { useEffect, useState, useRef } from "react";

interface Banner {
  _id: string;
  image: string;
  publicId: string;
  isActive: boolean;
  order: number;
}

const API = `${process.env.NEXT_PUBLIC_API_URL}/home`;

export default function HomePage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const editInputRef = useRef<HTMLInputElement>(null);
  const editingId = useRef<string | null>(null);

  // FETCH BANNERS
  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_URL}/home/banners`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch banners");
      }

      setBanners(data.banners);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load banners"
      );
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // SELECT IMAGES
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = Array.from(e.target.files || []);

    previews.forEach((url) => URL.revokeObjectURL(url));

    if (selected.length > 10) {
      setError("Maximum 10 images can be uploaded at once");
      setFiles([]);
      setPreviews([]);
      return;
    }

    setError("");
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  // UPLOAD BANNERS
  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select banner images");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${API_URL}/banners`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage("Banners uploaded successfully!");

      previews.forEach((url) => URL.revokeObjectURL(url));

      setFiles([]);
      setPreviews([]);

      await fetchBanners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // OPEN EDIT
  const handleEdit = (id: string) => {
    editingId.current = id;
    editInputRef.current?.click();
  };

  // REPLACE BANNER
  const handleReplace = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const id = editingId.current;

    if (!file || !id) return;

    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setError("Select a valid image under 10 MB");
      e.target.value = "";
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API}/banners/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      setMessage("Banner updated successfully!");
      await fetchBanners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
      editingId.current = null;
      e.target.value = "";
    }
  };

  // DELETE BANNER
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/banners/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setMessage("Banner deleted successfully!");
      await fetchBanners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ACTIVE / INACTIVE
  const handleStatus = async (id: string) => {
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API}/banners/${id}/status`,
        { method: "PATCH" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setMessage("Banner status updated!");
      await fetchBanners();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Status update failed"
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">

      <section className="flex min-h-screen flex-col md:flex-row">

        {/* MAIN CONTENT */}
        <div className="min-w-0 flex-1 bg-[#f3f3f5] px-6 py-10 md:px-10">

          <div className="mx-auto max-w-7xl">

            <h1 className="mb-5 text-4xl font-normal text-gray-900 md:text-5xl">
             Home Page
            </h1>

            <hr className="mb-8 border-gray-400" />

            {/* UPLOAD SECTION */}
            <div className="space-y-5">

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-lg border border-gray-300 bg-[#e9e9e9] text-lg file:mr-5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-500 file:px-5 file:py-3 file:font-semibold file:text-black"
              />

              {/* PREVIEW */}
              {previews.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {previews.map((preview, index) => (
                    <img
                      key={preview}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-28 w-48 rounded-md border object-cover"
                    />
                  ))}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={loading}
                className="rounded-md bg-blue-600 px-7 py-3 text-lg text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Upload"}
              </button>

              <input
                ref={editInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleReplace}
              />

              {message && (
                <p className="font-medium text-green-700">
                  {message}
                </p>
              )}

              {error && (
                <p className="font-medium text-red-600">
                  {error}
                </p>
              )}

            </div>

            <hr className="my-8 border-gray-400" />

            {/* BANNER TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full border-collapse text-left">

                <thead>
                  <tr className="bg-[#174b91] text-white">
                    <th className="px-4 py-5 text-lg">S.No</th>
                    <th className="px-4 py-5 text-lg text-center">
                      Banner Image
                    </th>
                    <th className="px-4 py-5 text-lg">Status</th>
                    <th className="px-4 py-5 text-lg">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {banners.map((banner, index) => (
                    <tr
                      key={banner._id}
                      className="border-b border-gray-500 bg-[#e9e9e9]"
                    >

                      <td className="px-4 py-6 text-lg">
                        {index + 1}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col items-center gap-2">

                          <img
                            src={banner.image}
                            alt={`Banner ${index + 1}`}
                            className="h-24 w-48 rounded-md border border-gray-400 object-cover"
                          />

                          <a
                            href={banner.image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 underline"
                          >
                            View Banner
                          </a>

                        </div>
                      </td>

                      <td className="px-4 py-6">
                        <button
                          onClick={() => handleStatus(banner._id)}
                          disabled={loading}
                          className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                            banner.isActive
                              ? "bg-green-600"
                              : "bg-gray-500"
                          }`}
                        >
                          {banner.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="px-4 py-6">
                        <div className="flex flex-wrap gap-2">

                          <button
                            onClick={() => handleEdit(banner._id)}
                            disabled={loading}
                            className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(banner._id)}
                            disabled={loading}
                            className="rounded-md bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

              {banners.length === 0 && (
                <p className="py-10 text-center text-gray-500">
                  No banners uploaded yet.
                </p>
              )}

            </div>

          </div>
        </div>

      </section>
    </main>
  );
}
