"use client";

import { useEffect, useState } from "react";

// Video data structure
interface Video {
  _id: string;
  year: string;
  url: string;
  title: string;
  date: string;
}

// Video Gallery Admin component
export default function VideoGalleryAdmin() {
  // Backend API endpoint
  const API = `${process.env.NEXT_PUBLIC_API_URL}/gallery/video-gallery`;

  // Store video gallery data
  const [data, setData] = useState<Video[]>([]);

  // Form state for adding new video
  const [form, setForm] = useState({
    year: "",
    url: "",
    title: "",
    date: "",
  });

  // Track currently editing video id
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  // Temporary values while editing
  const [tempValue, setTempValue] = useState({
    year: "",
    url: "",
    title: "",
    date: "",
  });

  // Fetch videos when component loads
  useEffect(() => {
    fetchVideos();
  }, []);

  // Get all videos from MongoDB
  const fetchVideos = async () => {
    try {
      const res = await fetch(API);

      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }

      const result = await res.json();

      setData(result);
    } catch (err) {
      console.log(err);
      alert("Unable to load videos");
    }
  };

  // Convert YouTube URL into embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    let id = "";

    if (url.includes("youtube.com/watch?v=")) {
      id = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      id = url.split("youtu.be/")[1]?.split("?")[0];
    }

    return `https://www.youtube.com/embed/${id}`;
  };

  // Upload new video
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

      alert("Video uploaded successfully");

      // Refresh latest MongoDB data
      await fetchVideos();

      // Reset form
      setForm({
        year: "",
        url: "",
        title: "",
        date: "",
      });
    } catch (err) {
      console.log(err);
      alert("Unable to upload video");
    }
  };

  // Enable edit mode
  const handleEdit = (item: Video) => {
    setEditingIndex(item._id);

    setTempValue({
      year: item.year,
      url: item.url,
      title: item.title,
      date: item.date,
    });
  };

  // Save updated video
  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempValue),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Video updated successfully");

      await fetchVideos();

      setEditingIndex(null);
    } catch (err) {
      console.log(err);
      alert("Unable to update video");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingIndex(null);
    setTempValue({
      year: "",
      url: "",
      title: "",
      date: "",
    });
  };

  // Delete video from MongoDB
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      alert("Video deleted successfully");

      // Refresh data after deleting from MongoDB
      await fetchVideos();
    } catch (err) {
      console.log(err);
      alert("Unable to delete video");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-normal mb-4">
        Video Gallery Page
      </h2>

      <hr className="border-t border-slate-400 mb-6" />

      {/* Add Video Form */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <input type="text" placeholder="Year" value={form.year}
          onChange={(e) =>
            setForm({
              ...form,
              year: e.target.value,
            })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input type="text" placeholder="YouTube URL" value={form.url}
          onChange={(e) =>
            setForm({
              ...form,
              url: e.target.value,
            })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input type="text" placeholder="Title" value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input type="date" value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />
      </div>

      {/* Upload Button */}
      <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mb-6 cursor-pointer" >
        Upload
      </button>

      <hr className="border-b border-slate-400 mb-8" />

      {/* Video Gallery Table */}
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
            // Empty table message
            <tr>
              <td colSpan={5} className="text-center p-8 text-gray-500">
                No Records Found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item._id} className="border-b">
                {/* Year Column */}
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

                {/* Video Column */}
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
                    <iframe src={getEmbedUrl(item.url)}
                      title={item.title} className="w-24 h-16"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen loading="lazy"
                    />
                  )}
                </td>

                {/* Title Column */}
                <td className="p-3">
                  {editingIndex === item._id ? (
                    <input
                      value={tempValue.title}
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

                {/* Date Column */}
                <td className="p-3">
                  {editingIndex === item._id ? (
                    <input
                      type="date"
                      value={tempValue.date}
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

                {/* Action Buttons */}
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

                      <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer" >
                        Delete
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
  );
}