
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryImage {
  _id: string;
  title: string;
  year: number;
  category: string;
  image: string;
  createdAt?: string;
}

const CATEGORIES = [
  "Sai Angels School",
  "Little Sai Angels",
  "Sai Cherubs",
  "Sai Boarding Home",
];

const YEARS = Array.from(
  { length: 11 },
  (_, index) => new Date().getFullYear() - index
);

export default function AdminGallery() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/admin/PhotoGallery`;

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fileRef = useRef<HTMLInputElement | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to load gallery");
      }

      setPreview(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load gallery"
      );
    }
  }, [API]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    if (!title.trim() || !year || !category || !image) {
      setError("Please fill in all fields and choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("year", year);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("folder", "Gallery");

    try {
      setLoading(true);
      setError("");

      const res = await fetch(API, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Upload failed");
      }

      setTitle("");
      setYear(String(new Date().getFullYear()));
      setCategory(CATEGORIES[0]);
      setImage(null);

      if (fileRef.current) {
        fileRef.current.value = "";
      }

      await fetchData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

      setPreview((previous) =>
        previous.filter((item) => item._id !== id)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Delete failed"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <div className="rounded-xl border bg-white p-5 shadow-lg sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Upload Gallery Image
        </h2>

        <form onSubmit={handleSave} className="grid gap-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Image Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3"
              required
            >
              {YEARS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3"
              required
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Upload Image
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
              className="block w-full cursor-pointer text-sm"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-fit"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border bg-white shadow-lg">
        <div className="border-b px-6 py-4">
          <h3 className="text-xl font-semibold">Gallery Preview</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#10458e] text-white">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {preview.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-500"
                  >
                    No images uploaded
                  </td>
                </tr>
              ) : (
                preview.map((item, index) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-lg border object-cover"
                      />
                    </td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.year}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => deleteImage(item._id)}
                        disabled={deletingId === item._id}
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        {deletingId === item._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
