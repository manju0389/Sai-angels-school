"use client";

import { useEffect, useRef, useState } from "react";

// Cloudinary image interface
interface CloudinaryImage {
  url: string;
  public_id: string;
}

// Sai Cherubs data interface
interface SaiCherubs {
  _id: string;
  title: string;
  date: string;
  images: CloudinaryImage[];
}

// API URL for development and production
const API = `${process.env.NEXT_PUBLIC_API_URL}/activities/sai-cherubs-international`;

export default function SaiCherubsInternationalAdmin() {

  // Store fetched activities
  const [data, setData] = useState<SaiCherubs[]>([]);

  // Store image preview URLs
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // File input reference
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Add form data
  const [form, setForm] = useState({
    title: "",
    date: "",
    images: [] as File[],
  });

  // Current editing row index
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Temporary edit data
  const [tempValue, setTempValue] = useState({
    title: "",
    date: "",
    images: [] as File[],
  });


  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      setData(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Load data when page opens
  useEffect(() => {
    fetchData();
  }, []);

  // ================= ADD ACTIVITY =================
  const handleAdd = async () => {
    if (
      !form.title ||
      !form.date ||
      form.images.length === 0
    ) {
      alert("Please fill all fields");
      return;
    }
    const formData = new FormData();

    formData.append(
      "title", form.title
    );

    formData.append(
      "date", form.date
    );

    // Cloudinary folder name
    formData.append(
      "folder", "SaiCherubsInternational"
    );

    // Multiple image upload
    form.images.forEach((file) => {
      formData.append(
        "images", file
      );
    });

    try {
      const res = await fetch(API, {
        method: "POST", body: formData,
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(
          result.message
        );
      }

      alert(
        "Uploaded successfully"
      );

      setForm({
        title: "",
        date: "",
        images: [],
      });

      setPreviewImages([]);
      if (fileRef.current) { fileRef.current.value = ""; }

      fetchData();
    } catch (error) {
      console.log(error);

      alert(
        "Upload failed"
      );
    }
  };
  // ================= EDIT ACTIVITY =================
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempValue({
      title: data[index].title,
      date: data[index].date.slice(0, 10),
      images: [],
    });
  };

  // ================= SAVE EDIT =================
  const handleSave = async (id: string) => {
    const formData = new FormData();

    formData.append(
      "title", tempValue.title
    );

    formData.append(
      "date", tempValue.date
    );

    // Cloudinary folder
    formData.append(
      "folder", "SaiCherubsInternational"
    );

    // Upload new images if selected
    tempValue.images.forEach(
      (file: File) => {
        formData.append(
          "images", file
        );
      }
    );

    try {
      const res = await fetch(
        `${API}/${id}`,
        {
          method: "PUT", body: formData,
        }
      );

      const result = await res.json();
      if (!result.success) {
        throw new Error(
          result.message
        );
      }

      alert(
        "Updated successfully"
      );

      setEditingIndex(null);
      fetchData();
    } catch (error) {
      console.log(error);

      alert(
        "Update failed"
      );
    }
  };

  // ================= DELETE ACTIVITY =================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this activity?\n\nImages will also be removed from Cloudinary."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await fetch(
        `${API}/${id}`,
        {
          method: "DELETE",

        }
      );

      const result = await res.json();
      if (!result.success) {
        throw new Error(
          result.message
        );
      }

      alert(
        "Deleted successfully"
      );
      fetchData();
    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-4xl mb-5">
        Sai Cherubs International
      </h2>

      <hr />

      {/* Add Activity Form */}
      <div className="grid gap-3 mt-6">
        <input type="text" placeholder="Title" value={form.title}

          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input type="date" value={form.date}

          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value
            })
          }
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />

        <input
          ref={fileRef} type="file" multiple accept="image/*"
          onChange={(e) => {
            const files =
              Array.from(
                e.target.files || []
              );

            setForm({
              ...form,
              images: files,
            });

            setPreviewImages(
              files.map(
                file =>
                  URL.createObjectURL(file)
              )
            );
          }}
          className="h-10 bg-[#e9e8e8] border border-gray-300 px-3 rounded"
        />
      </div>

      {/* Image Preview */}
      <div className="flex gap-3 mt-4 flex-wrap">
        {
          previewImages.map(
            (img, index) => (
              <img key={index} src={img} className="w-24 h-20 object-cover rounded" />
            )
          )
        }
      </div>

      <button onClick={handleAdd} className="bg-blue-600 text-white px-5 py-2 rounded mt-5 cursor-pointer" >
        Upload
      </button>

      <hr className="my-6" />

      {/* Activities Table */}
      <table className="w-full bg-gray-100">
        <thead>
          <tr className="bg-[#10458e] text-white">
            <th className="p-3">
              Images
            </th>

            <th>
              Title
            </th>

            <th>
              Date
            </th>

            <th>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {
            data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-8">
                  No Records Found
                </td>
              </tr>
            ) : (
              data.map(
                (item, index) => (
                  <tr key={item._id} className="border-b" >

                    {/* Images */}
                    <td className="p-3">
                      <div className="flex gap-2">
                        {
                          item.images.map(
                            (img, i) => (
                              <img key={i} src={img.url}
                                className="w-20 h-16 object-cover rounded"
                              />
                            )
                          )
                        }
                      </div>
                    </td>

                    {/* Title */}
                    <td className="p-3">
                      {
                        editingIndex === index ? (
                          <input value={tempValue.title}
                            onChange={(e) =>
                              setTempValue({
                                ...tempValue,
                                title: e.target.value
                              })
                            }
                            className="border p-1"
                          />
                        ) : (
                          item.title
                        )
                      }
                    </td>

                    {/* Date */}
                    <td className="p-3">
                      {
                        editingIndex === index ? (
                          <input type="date" value={tempValue.date}
                            onChange={(e) =>
                              setTempValue({
                                ...tempValue,
                                date: e.target.value
                              })
                            }
                            className="border px-2 py-1"
                          />
                        ) : (
                          new Date(
                            item.date
                          ).toLocaleDateString()
                        )
                      }
                    </td>

                    {/* Actions */}
                    <td className="p-3">
                      {
                        editingIndex === index ? (
                          <>
                            <button onClick={() => handleSave(item._id)}
                              className="bg-green-600 text-white px-3 py-1 rounded mr-2 cursor-pointer" >
                              Save
                            </button>

                            <button onClick={() => setEditingIndex(null)}
                              className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer" >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(index)}
                              className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer" >
                              Edit
                            </button>

                            <button onClick={() => handleDelete(item._id)}
                              className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer" >
                              Delete
                            </button>
                          </>
                        )
                      }
                    </td>
                  </tr>
                )
              )
            )
          }
        </tbody>
      </table>
    </div>
  );
}