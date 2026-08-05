"use client";

import { useEffect, useState } from "react";

interface ImageType {
  url: string;
  public_id?: string;
  file?: File | null;
}

interface AchievementType {
  _id: string;
  year: string;
  images: ImageType[];
}

export default function Achievements() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/achievements`;

  const [year, setYear] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<ImageType[]>([]);
  const [data, setData] = useState<AchievementType[]>([]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const [tempYear, setTempYear] = useState("");
  const [tempImages, setTempImages] = useState<ImageType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(API);

      if (!res.ok) throw new Error("Failed to fetch achievements");

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(e.target.files || []);

    setFiles(selectedFiles);

    const previews: ImageType[] = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreview(previews);
  };

  const handleSave = async () => {
    if (!year.trim()) {
      alert("Enter year");
      return;
    }

    if (files.length === 0) {
      alert("Choose images");
      return;
    }

    const formData = new FormData();

    formData.append("year", year);
    formData.append("folder", "Achievements");

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch(API, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Upload failed");
        return;
      }

      alert("Achievement uploaded");

      setYear("");
      setFiles([]);
      setPreview([]);

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (
    item: AchievementType,
    index: number
  ) => {
    setEditingIndex(index);
    setEditId(item._id);

    setTempYear(item.year);

    setTempImages(
      item.images.map((img) => ({
        url: img.url,
        public_id: img.public_id,
        file: null,
      }))
    );
  };

  const handleSaveEdit = async () => {
    if (!editId) return;

    const formData = new FormData();

    formData.append("year", tempYear);
    formData.append("folder", "Achievements");

    tempImages.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });

    try {
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        alert("Update failed");
        return;
      }

      alert("Updated successfully");

      setEditingIndex(null);
      setEditId(null);
      setTempYear("");
      setTempImages([]);

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditId(null);
    setTempImages([]);
    setTempYear("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this achievement?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      alert("Deleted");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-normal mb-4">
        Achievements Page
      </h2>

      <hr className="border-t border-slate-400 mb-6" />

      <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)}
        className="w-full h-10 bg-[#e9e8e8] border border-gray-300 rounded-md px-3 mb-4 outline-none font-semibold"
      />

      <input type="file" multiple accept="image/*" onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-md bg-[#e9e8e8] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#00c6ff] file:text-sm file:font-semibold mb-4 file:cursor-pointer"
      />

      {preview.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-5">
          {preview.map((img, index) => (
            <img key={index} src={img.url} 
              alt="" className="w-20 h-20 rounded border object-cover"
            />
          ))}
        </div>
      )}

      <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded cursor-pointer" >
        Upload
      </button>

      <hr className="my-6 border-slate-400" />

      <table className="w-full border-collapse bg-[#e9e8e8]">
        <thead>
          <tr className="bg-[#10458e] text-white">
            <th className="text-left p-3">Year</th>
            <th className="text-left p-3">Images</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-5" >
                No Records Found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item._id} className="border-b" >
                <td className="p-3">
                  {editingIndex === index ? (
                    <input value={tempYear}
                      onChange={(e) => setTempYear(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    item.year
                  )}
                </td>

                <td className="p-3">
                  <div className="flex gap-2 flex-wrap">
                    {(editingIndex === index
                      ? tempImages : item.images
                    ).map((img, i) => (
                      <img key={i} src={img.url}
                        alt="" className="w-16 h-16 object-cover rounded border"
                      />
                    ))}
                  </div>

                  {editingIndex === index && (
                    <input type="file" multiple accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(
                          e.target.files || []
                        );

                        const newImages: ImageType[] =
                          files.map((file) => ({file, url: URL.createObjectURL(file),}));

                        setTempImages((prev) => [
                          ...prev, ...newImages,
                        ]);
                      }}
                      className="mt-2"
                    />
                  )}
                </td>

                <td className="p-3">
                  {editingIndex === index ? (
                    <>
                      <button onClick={handleSaveEdit} className="bg-green-600 text-white px-3 py-1 rounded mr-2 cursor-pointer" >
                        Save
                      </button>

                      <button onClick={handleCancelEdit} className="bg-gray-600 text-white px-3 py-1 rounded cursor-pointer" >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item, index)} className="bg-blue-600 text-white px-3 py-1 rounded mr-2 cursor-pointer" >
                        Edit
                      </button>

                      <button onClick={() => handleDelete(item._id) } className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer" >
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