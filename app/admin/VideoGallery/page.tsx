
"use client";

import { useEffect, useState } from "react";

// Define the video data structure
interface Video {
  _id: string;
  year: string;
  url: string;
  title: string;
  date: string;
}

// Video gallery admin component
export default function VideoGalleryAdmin() {
  // Backend API endpoint
  const API = `${process.env.NEXT_PUBLIC_API_URL}/gallery/video-gallery`;

  // Store video gallery records
  const [data, setData] = useState<Video[]>([]);

  // Store new video form values
  const [form, setForm] = useState({
    year: "",
    url: "",
    title: "",
    date: "",
  });

  // Track the video currently being edited
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  // Store temporary editing values
  const [tempValue, setTempValue] = useState({
    year: "",
    url: "",
    title: "",
    date: "",
  });

  // Track the video being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch videos when the component loads
  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch all videos from MongoDB through the backend API
  const fetchVideos = async () => {
    try {
      const res = await fetch(API);

      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Unable to load videos");
    }
  };

  // Convert supported YouTube URLs into embed URLs
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);
      let id = "";

      if (parsed.hostname === "youtu.be" ||
          parsed.hostname.endsWith(".youtu.be")) {
        id = parsed.pathname.split("/")[1] || "";
      } else if (
        parsed.hostname === "youtube.com" ||
        parsed.hostname.endsWith(".youtube.com")
      ) {
        if (parsed.pathname === "/watch") {
          id = parsed.searchParams.get("v") || "";
        } else if (
          parsed.pathname.startsWith("/embed/") ||
          parsed.pathname.startsWith("/shorts/")
        ) {
          id = parsed.pathname.split("/")[2] || "";
        }
      }

      return id ? `https://www.youtube.com/embed/${id}` : "";
    } catch {
      return "";
    }
  };

  // Add a new video to MongoDB
  const handleAdd = async () => {
    if (!form.year || !form.url || !form.title || !form.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Upload failed");
        return;
      }

      alert("Video uploaded successfully to MongoDB");

      // Refresh the table with saved database records
      await fetchVideos();

      // Clear the form after successful upload
      setForm({
        year: "",
        url: "",
        title: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      alert("Unable to upload video");
    }
  };

  // Enter edit mode and populate the form
  const handleEdit = (item: Video) => {
    setEditingIndex(item._id);
    setTempValue({
      year: item.year,
      url: item.url,
      title: item.title,
      date: item.date,
    });
  };

  // Save changes to the selected MongoDB record
  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempValue),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Update failed");
      }

      alert("Video updated successfully");

      await fetchVideos();
      setEditingIndex(null);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unable to update video");
    }
  };

  // Cancel editing without saving changes
  const handleCancel = () => {
    setEditingIndex(null);
    setTempValue({
      year: "",
      url: "",
      title: "",
      date: "",
    });
  };

  // Delete a video from MongoDB
  const handleDelete = async (id: string) => {
    // Ask for confirmation before deleting permanently
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video from MongoDB? This action cannot be undone."
    );

    if (!confirmDelete) return;

    // Prevent repeated delete requests for the same record
    setDeletingId(id);

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

      // Remove the deleted record from the screen immediately
      setData((previousData) =>
        previousData.filter((item) => item._id !== id)
      );

      // Show confirmation only after the server confirms deletion
      alert("Video deleted successfully from MongoDB");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unable to delete video");
    } finally {
      // Clear the deleting state whether the request succeeds or fails
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-normal mb-4">
        Video Gallery Page
      </h2>

      <hr className="border-t border-slate-400 mb-6" />

      {/* Form for adding a new video */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <input type="text" placeholder="Year" value={form.year}
          onChange={(e) =>
            setForm({ ...form, year: e.target.value })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input type="text" placeholder="YouTube URL" value={form.url}
          onChange={(e) =>
            setForm({ ...form, url: e.target.value })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input type="text" placeholder="Title" value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input type="date" value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />
      </div>

      {/* Submit the new video to the backend */}
      <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mb-6 cursor-pointer" >
        Upload
      </button>

      <hr className="border-b border-slate-400 mb-8" />

      {/* Display all video records in a table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse bg-[#e9e8e8]">
          <thead>
            <tr className="bg-[#10458e] text-white">
              <th className="p-3">Year</th>
              <th className="p-3">Video</th>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-500" >
                  No Records Found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id} className="border-b">
                  {/* Year */}
                  <td className="p-3">
                    {editingIndex === item._id ? (
                      <input value={tempValue.year}
                        onChange={(e) =>
                          setTempValue({
                            ...tempValue,
                            year: e.target.value,
                          })
                        }
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      item.year
                    )}
                  </td>

                  {/* YouTube video URL and preview */}
                  <td className="p-3">
                    {editingIndex === item._id ? (
                      <input value={tempValue.url}
                        onChange={(e) =>
                          setTempValue({
                            ...tempValue,
                            url: e.target.value,
                          })
                        }
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      <iframe src={getEmbedUrl(item.url)} title={item.title}
                        className="w-24 h-16"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen loading="lazy"
                      />
                    )}
                  </td>

                  {/* Video title */}
                  <td className="p-3">
                    {editingIndex === item._id ? (
                      <input value={tempValue.title}
                        onChange={(e) =>
                          setTempValue({
                            ...tempValue,
                            title: e.target.value,
                          })
                        }
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      item.title
                    )}
                  </td>

                  {/* Video date */}
                  <td className="p-3">
                    {editingIndex === item._id ? (
                      <input type="date" value={tempValue.date}
                        onChange={(e) =>
                          setTempValue({
                            ...tempValue,
                            date: e.target.value,
                          })
                        }
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      item.date
                    )}
                  </td>

                  {/* Edit, save, cancel, and delete actions */}
                  <td className="p-3">
                    {editingIndex === item._id ? (
                      <>
                        <button onClick={() => handleSave(item._id)} className="bg-green-600 text-white px-3 py-1 rounded mr-2 cursor-pointer" >
                          Save
                        </button>

                        <button onClick={handleCancel} className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer" >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer" >
                          Edit
                        </button>

                        <button onClick={() => handleDelete(item._id)} disabled={deletingId === item._id}
                          className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" >
                          {deletingId === item._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
