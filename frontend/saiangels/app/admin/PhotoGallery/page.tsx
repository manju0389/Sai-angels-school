
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

interface GalleryForm {
  title: string;
  category: string;
  year: string;
}

const EMPTY_FORM: GalleryForm = {
  title: "",
  category: "",
  year: String(new Date().getFullYear()),
};

export default function AdminGallery() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/admin/PhotoGallery`;

  const [form, setForm] = useState<GalleryForm>({ ...EMPTY_FORM });
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setFetching(true);

      const res = await fetch(API);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Unable to load gallery");
      }

      setPreview(result.data || []);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load gallery"
      );
    } finally {
      setFetching(false);
    }
  }, [API]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const resetForm = () => {
  setForm({ ...EMPTY_FORM });
  setImages([]);
  setEditingId(null);

  if (fileRef.current) {
    fileRef.current.value = "";
  }
};

  
const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (loading) return;

  if (!form.title.trim() || !form.category.trim() || !form.year.trim()) {
    alert("Please enter the title, year, and category.");
    return;
  }

  if (!/^\d{4}$/.test(form.year.trim())) {
    alert("Please enter a valid four-digit year.");
    return;
  }

  if (!editingId && images.length === 0) {
    alert("Please select at least one image.");
    return;
  }

  const formData = new FormData();
  formData.append("title", form.title.trim());
  formData.append("year", form.year.trim());
  formData.append("category", form.category.trim());

  images.forEach((file) => {
    formData.append("images", file);
  });

  try {
    setLoading(true);

    const url = editingId ? `${API}/${editingId}` : API;

    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Unable to save images.");
    }

    alert(
      editingId
        ? "Gallery image updated successfully."
        : `${result.data?.length ?? images.length} image(s) uploaded successfully.`
    );

    resetForm();
    await fetchData();
  } catch (error) {
    console.error(error);
    alert(error instanceof Error ? error.message : "Unable to save images.");
  } finally {
    setLoading(false);
  }
};


  const handleEdit = (item: GalleryImage) => {
  setEditingId(item._id);

  setForm({
    title: item.title,
    year: item.year || String(new Date().getFullYear()),
    category: item.category,
  });

  setImages([]);

  if (fileRef.current) {
    fileRef.current.value = "";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

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

      if (editingId === id) {
        resetForm();
      }

      alert("Gallery image deleted successfully.");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Unable to delete image."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Photo Gallery Management
          </h1>
          <p className="mt-2 text-gray-600">
            Add your own gallery years and categories, upload images, and
            manage existing records.
          </p>
        </div>

        {/* Add / Edit form */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {editingId ? "Edit Gallery Image" : "Add Gallery Image"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="grid gap-5 sm:grid-cols-2">
            {/* Image title */}
            <div>
              <label
                htmlFor="gallery-title"
                className="mb-2 block font-semibold text-gray-700"
              >
                Image Title
              </label>

              <input
                id="gallery-title"
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((previous) => ({
                    ...previous,
                    title: e.target.value,
                  }))
                }
                placeholder="Example: Annual Day Celebration"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Custom year */}
            <div>
              <label
                htmlFor="gallery-year"
                className="mb-2 block font-semibold text-gray-700"
              >
                Gallery Year
              </label>

              <input
                id="gallery-year"
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm((previous) => ({
                    ...previous,
                    year: e.target.value,
                  }))
                }
                placeholder="Example: 2027"
                min="1000"
                max="9999"
                step="1"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-gray-500">
                Enter any four-digit gallery year.
              </p>
            </div>

            {/* Custom category */}
            <div>
              <label
                htmlFor="gallery-category"
                className="mb-2 block font-semibold text-gray-700"
              >
                Gallery Category
              </label>

              <input
                id="gallery-category"
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm((previous) => ({
                    ...previous,
                    category: e.target.value,
                  }))
                }
                placeholder="Example: Sports Day"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-gray-500">
                Enter any category name you want.
              </p>
            </div>

            {/* Image upload */}
            <div>
            <label
              htmlFor="gallery-image"
              className="mb-2 block font-semibold text-gray-700"
            >
              Gallery Images
              {editingId && (
                <span className="ml-2 text-xs font-normal text-gray-500">
                  (Choose one replacement image, or leave empty)
                </span>
              )}
            </label>
          
            <input
              ref={fileRef}
              id="gallery-image"
              type="file"
              accept="image/*"
              multiple={!editingId}
              required={!editingId}
              onChange={(e) => {
                setImages(Array.from(e.target.files || []));
              }}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700"
            />
          
            {images.length > 0 && (
              <p className="mt-2 text-sm text-green-700">
                {images.length} image(s) selected
              </p>
            )}
          </div>

            {/* Submit */}
            <div className="flex flex-wrap gap-3 pt-2 sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Please wait..."
                  : editingId
                    ? "Save Changes"
                    : "Upload Image"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Preview table */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5 sm:p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Gallery Preview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                All uploaded gallery images
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {preview.length} images
            </span>
          </div>

          {errorMessage && (
            <div className="m-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
              <button
                type="button"
                onClick={() => void fetchData()}
                className="ml-3 font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">
              <thead>
                <tr className="bg-[#10458e] text-left text-white">
                  <th className="p-4">#</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {fetching ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-gray-500"
                    >
                      Loading gallery images...
                    </td>
                  </tr>
                ) : preview.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-gray-500"
                    >
                      No gallery images uploaded yet.
                    </td>
                  </tr>
                ) : (
                  preview.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-b border-gray-200 transition hover:bg-blue-50/50 ${
                        editingId === item._id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="p-4 text-gray-600">{index + 1}</td>

                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-20 w-28 rounded-lg border border-gray-200 object-cover"
                        />
                      </td>

                      <td className="max-w-xs p-4 font-medium text-gray-800">
                        {item.title}
                      </td>

                      <td className="p-4">
                        <span className="rounded-md bg-purple-50 px-3 py-1 font-semibold text-purple-700">
                          {item.year || "Not assigned"}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            disabled={loading || deletingId === item._id}
                            className="rounded-lg bg-amber-500 px-4 py-2 cursor-pointer text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => void handleDelete(item._id)}
                            disabled={
                              deletingId === item._id || loading
                            }
                            className="rounded-lg bg-red-600 px-4 cursor-pointer py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === item._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
