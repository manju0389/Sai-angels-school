
"use client";

import { useEffect, useState, useRef } from "react";

interface Banner {
  _id: string;
  image: string;
  publicId: string;
  isActive: boolean;
  order: number;
}

interface Topper {
  _id: string;
  name: string;
  score: string;
  poster: string;
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

  const [toppers, setToppers] = useState<Topper[]>([]);
  const [topperName, setTopperName] = useState("");
  const [topperScore, setTopperScore] = useState("");
  const [topperFile, setTopperFile] = useState<File | null>(null);
  const [topperPreview, setTopperPreview] = useState("");
  const [editingTopperId, setEditingTopperId] = useState<string | null>(null);

  const editInputRef = useRef<HTMLInputElement>(null);
  const editingId = useRef<string | null>(null);

  // FETCH BANNERS
  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API}/banners`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch banners");
      }

      setBanners(data.banners || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load banners");
    }
  };

  // FETCH TOPPERS
  const fetchToppers = async () => {
    try {
      const response = await fetch(`${API}/toppers`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch toppers");
      }

      setToppers(data.toppers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load toppers");
    }
  };

  useEffect(() => {
    fetchBanners();
    fetchToppers();
  }, []);

  // BANNER UPLOAD
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

      const response = await fetch(`${API}/banners`, {
        method: "POST",
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

  // BANNER EDIT
  const handleEdit = (id: string) => {
    editingId.current = id;
    editInputRef.current?.click();
  };

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

  // BANNER DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner? This will remove it from MongoDB and Cloudinary."
    );

    if (!confirmDelete) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/banners/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete banner");
      }

      alert("Banner deleted successfully!");
      await fetchBanners();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete banner");
    } finally {
      setLoading(false);
    }
  };

  // BANNER STATUS
  const handleStatus = async (id: string) => {
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/banners/${id}/status`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setMessage("Banner status updated!");
      await fetchBanners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status update failed");
    }
  };

  // RESET TOPPER FORM
  const resetTopperForm = () => {
    if (topperPreview.startsWith("blob:")) {
      URL.revokeObjectURL(topperPreview);
    }

    setTopperName("");
    setTopperScore("");
    setTopperFile(null);
    setTopperPreview("");
    setEditingTopperId(null);
  };

  // ADD OR UPDATE TOPPER
  const handleTopperSubmit = async () => {
    if (!topperName.trim() || !topperScore.trim()) {
      setError("Please enter student name and score");
      return;
    }

    if (!editingTopperId && !topperFile) {
      setError("Please select a topper poster");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("name", topperName.trim());
      formData.append("score", topperScore.trim());

      if (topperFile) {
        formData.append("poster", topperFile);
      }

      const url = editingTopperId
        ? `${API}/toppers/${editingTopperId}`
        : `${API}/toppers`;

      const response = await fetch(url, {
        method: editingTopperId ? "PUT" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save topper");
      }

      setMessage(
        editingTopperId
          ? "Topper updated successfully!"
          : "Topper added successfully!"
      );

      resetTopperForm();
      await fetchToppers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save topper");
    } finally {
      setLoading(false);
    }
  };

  // TOPPER EDIT
  const handleTopperEdit = (topper: Topper) => {
    setEditingTopperId(topper._id);
    setTopperName(topper.name);
    setTopperScore(topper.score);
    setTopperFile(null);
    setTopperPreview(topper.poster);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // TOPPER FILE SELECT
  const handleTopperFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 10 * 1024 * 1024
    ) {
      setError("Select a JPG, PNG or WebP image under 10 MB");
      e.target.value = "";
      return;
    }

    if (topperPreview.startsWith("blob:")) {
      URL.revokeObjectURL(topperPreview);
    }

    setError("");
    setTopperFile(file);
    setTopperPreview(URL.createObjectURL(file));
  };

  // TOPPER DELETE
  const handleTopperDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this topper? This will remove the record from MongoDB and the poster from Cloudinary."
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/toppers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete topper");
      }

      alert("Topper deleted successfully!");
      await fetchToppers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete topper");
    } finally {
      setLoading(false);
    }
  };

  // TOPPER STATUS
  const handleTopperStatus = async (id: string) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/toppers/${id}/status`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setMessage("Topper status updated!");
      await fetchToppers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status update failed");
    } finally {
      setLoading(false);
    }
  };

  // ADMIN PAGE JSX
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="flex min-h-screen flex-col md:flex-row">
        <div className="min-w-0 flex-1 bg-[#f3f3f5] px-6 py-10 md:px-10">
          <div className="mx-auto max-w-7xl">

            <h1 className="mb-5 text-4xl font-normal text-gray-900">
              Home Page
            </h1>

            <hr className="mb-8 border-gray-400" />

            {/* BANNER UPLOAD */}
            <div className="space-y-5">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-lg border border-gray-300 bg-[#e9e9e9] text-lg file:mr-5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-500 file:px-5 file:py-3 file:font-semibold file:text-black"
              />

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
                className="cursor-pointer rounded-md bg-blue-600 px-7 py-3 text-lg text-white hover:bg-blue-700 disabled:opacity-50"
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
                <p className="font-medium text-green-700">{message}</p>
              )}

              {error && (
                <p className="font-medium text-red-600">{error}</p>
              )}
            </div>

            <hr className="my-8 border-gray-400" />

            {/* BANNER TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#174b91] text-white">
                    <th className="px-4 py-5 text-lg">S.No</th>
                    <th className="px-4 py-5 text-center text-lg">
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
                      <td className="px-4 py-6 text-lg">{index + 1}</td>

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
                            banner.isActive ? "bg-green-600" : "bg-gray-500"
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
                            className="cursor-pointer rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(banner._id)}
                            disabled={loading}
                            className="cursor-pointer rounded-md bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
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

            <hr className="my-10 border-gray-400" />

            {/* TOPPERS MANAGEMENT */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900">
                SSLC Rank Holders / Toppers
              </h2>

              <p className="text-gray-600">
                Add, edit, activate or delete student achievement posters.
              </p>

              {/* TOPPER FORM */}
              <div className="space-y-5 rounded-lg border border-gray-300 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingTopperId ? "Edit Topper" : "Add New Topper"}
                </h3>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Student Name
                  </label>

                  <input
                    type="text"
                    value={topperName}
                    onChange={(e) => setTopperName(e.target.value)}
                    placeholder="Enter student name"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Score
                  </label>

                  <input
                    type="text"
                    value={topperScore}
                    onChange={(e) => setTopperScore(e.target.value)}
                    placeholder="Example: SSLC (97.21%)"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Topper Poster
                  </label>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleTopperFileChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-500 file:px-5 file:py-3 file:font-semibold file:text-black"
                  />

                  <p className="mt-2 text-sm text-gray-500">
                    JPG, PNG or WebP. Maximum size: 10 MB.
                    {editingTopperId &&
                      " Leave empty to keep the existing poster."}
                  </p>
                </div>

                {topperPreview && (
                  <div>
                    <p className="mb-2 font-medium text-gray-700">
                      Poster Preview
                    </p>

                    <img
                      src={topperPreview}
                      alt="Topper poster preview"
                      className="h-64 w-48 rounded-md border border-gray-300 object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleTopperSubmit}
                    disabled={loading}
                    className="rounded-md bg-blue-600 px-7 py-3 cursor-pointer text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading
                      ? "Please wait..."
                      : editingTopperId
                      ? "Update Topper"
                      : "Add Topper"}
                  </button>

                  {editingTopperId && (
                    <button
                      type="button"
                      onClick={resetTopperForm}
                      disabled={loading}
                      className="rounded-md bg-gray-500 px-7 py-3 cursor-pointer text-white hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* TOPPERS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#174b91] text-white">
                      <th className="px-4 py-5">S.No</th>
                      <th className="px-4 py-5 text-center">Poster</th>
                      <th className="px-4 py-5">Student Name</th>
                      <th className="px-4 py-5">Score</th>
                      <th className="px-4 py-5">Status</th>
                      <th className="px-4 py-5">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {toppers.map((topper, index) => (
                      <tr
                        key={topper._id}
                        className="border-b border-gray-400 bg-[#e9e9e9]"
                      >
                        <td className="px-4 py-5">{index + 1}</td>

                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <img
                              src={topper.poster}
                              alt={topper.name}
                              className="h-36 w-28 rounded-md border border-gray-400 object-cover"
                            />
                          </div>
                        </td>

                        <td className="px-4 py-5 font-medium">
                          {topper.name}
                        </td>

                        <td className="px-4 py-5">{topper.score}</td>

                        <td className="px-4 py-5">
                          <button
                            type="button"
                            onClick={() => handleTopperStatus(topper._id)}
                            disabled={loading}
                            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                              topper.isActive ? "bg-green-600" : "bg-gray-500"
                            }`}
                          >
                            {topper.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>

                        <td className="px-4 py-5">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleTopperEdit(topper)}
                              disabled={loading}
                              className="rounded-md bg-blue-600 cursor-pointer px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleTopperDelete(topper._id)}
                              disabled={loading}
                              className="rounded-md bg-red-600 px-4 py-2 text-white cursor-pointer hover:bg-red-700 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {toppers.length === 0 && (
                  <p className="py-10 text-center text-gray-500">
                    No toppers added yet.
                  </p>
                )}
              </div>
            </section>

          </div>
        </div>
      </section>
    </main>
  );
}
