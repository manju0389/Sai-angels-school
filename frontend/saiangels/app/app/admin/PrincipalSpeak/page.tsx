"use client";

import { useEffect, useState } from "react";

// Image structure for existing images and uploaded image previews
type ImageItem = {
  url: string;
  public_id?: string;
  file?: File;
};

// Principal Speak data structure
type Principal = {
  _id: string;
  name: string;
  designation: string;
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
};

export default function PrincipalSpeak() {

  // API endpoint
  const API = `${process.env.NEXT_PUBLIC_API_URL}/about-us/principal-speaks`;

  // Add Principal form states
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");

  // Upload images and preview states
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<ImageItem[]>([]);

  // Principal data list
  const [data, setData] = useState<Principal[]>([]);

  // Edit mode state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Temporary edit form states
  const [tempName, setTempName] = useState("");
  const [tempDesignation, setTempDesignation] = useState("");
  const [tempDescription, setTempDescription] = useState("");

  // Temporary image states during edit
  const [tempImages, setTempImages] = useState<ImageItem[]>([]);

  // Fetch data when page loads
  useEffect(() => {
    fetchData();
  }, []);

  // Get Principal Speak records
  const fetchData = async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle image selection for new upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(
      e.target.files || []
    );
    setFiles(selectedFiles);

    // Create temporary preview URLs
    setPreview(
      selectedFiles.map(file => ({
        file, url: URL.createObjectURL(file)
      }))
    );
  };

  // Save new Principal Speak record
  const handleSave = async () => {
    // Validate required fields
    if (!name || !designation || !description) {
  alert("Please fill all fields");
  return;
}

if (data.length === 0 && files.length === 0) {
  alert("Please upload a banner image");
  return;
}

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("description", description);

    // Upload banner only for first founder
    if (data.length === 0) {files.forEach((file) => {formData.append("images", file);});}

    try {
      const res = await fetch(API, {
        method: "POST", body: formData
      });

      if (res.ok) {
        alert("Uploaded successfully");
        // Reset form after successful upload
        setName("");
        setDesignation("");
        setDescription("");
        setFiles([]);
        setPreview([]);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Load selected founder data into edit fields
    const handleEdit = (item: Principal) => {
    setEditingId(item._id);
    setTempName(item.name);
    setTempDesignation(item.designation);
    setTempDescription(item.description);

    // Set existing images for editing
    setTempImages(item.images.map(img => ({
        url: img.url, public_id: img.public_id
      }))
    );
  };

  // Handle adding new images while editing
  const handleEditImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(
      e.target.files || []
    );

    // Convert selected files into preview objects
    const newImages = files.map(file => ({
      file, url: URL.createObjectURL(file)
    }));

    // Keep old images and add new ones
    setTempImages(prev => [
      ...prev, ...newImages
    ]);
  };

  // Save updated founder details
  const handleSaveEdit = async () => {
    if (!editingId)
      return;

    const formData = new FormData();
    formData.append("name", tempName.trim());
    formData.append("designation", tempDesignation.trim());
    formData.append("description", tempDescription);

    // Update banner image only for first founder
    if (editingId === data[0]?._id) {
      tempImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });
    }

    try {
      const res = await fetch(`${API}/${editingId}`,
        {
          method: "PUT", body: formData
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert(
          "Founder updated successfully"
        );

        // Reset edit states after update
        setEditingId(null);
        setTempName("");        
        setTempDesignation("");
        setTempDescription("");
        setTempImages([]);
        fetchData();
      } else {
        alert(
          result.message || "Update failed"
        );
      }
    } catch (error) {
      console.log(error);
      alert(
        "Something went wrong"
      );
    }
  };

  // Cancel editing and clear temporary values
  const handleCancelEdit = () => {
    setEditingId(null);
    setTempName("");
    setTempDesignation("");
    setTempDescription("");
    setTempImages([]);
  };

  // Delete founder record
  const handleDelete = async (
    id: string
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this Founder?"
      );

    if (!confirmDelete)
      return;
    try {
      const res = await fetch(`${API}/${id}`,
        {
          method: "DELETE"
        }
      );

      if (res.ok) {
        alert(
          "Deleted successfully"
        );
        fetchData();
      }

    } catch (error) {
      console.log(error);
    }
  };

    return (
    <div className="p-6">
      {/* Page Heading */}
      <h2 className="text-4xl font-normal mb-4">
        Principal Speak Page
      </h2>

      <hr className="border-t border-slate-400 mb-6" />

      {/* Add Principal Form */}
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}
        className="w-full h-10 bg-[#e9e8e8] border border-gray-300 rounded px-3 mb-4"
      />

      <input type="text" placeholder="Designation" value={designation} onChange={e => setDesignation(e.target.value)}
        className="w-full h-10 bg-[#e9e8e8] border border-gray-300 rounded px-3 mb-4"
      />

      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows={8}
        className="w-full bg-[#e9e8e8] border border-gray-300 rounded px-3 py-2 mb-4"
      />

      {/* Show banner upload only for first founder */}
      {data.length === 0 && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded bg-[#e9e8e8] border border-gray-300 mb-4"/>

          {/* Banner Preview */}
          {preview.length > 0 && (
            <img src={preview[0].url} className="w-40 h-24 object-cover rounded mb-4 border"
            />
          )}
        </>
      )}

      {/* Submit button */}
      <button onClick={handleSave} className="bg-blue-600 text-white px-5 py-2 rounded cursor-pointer">
        Upload
      </button>

      <hr className="mt-8 border" />

      {/* Principal records table */}
      <table className="w-full mt-6 bg-[#e9e8e8]">
        <thead>
          <tr className="bg-[#10458e] text-white">

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Designation
            </th>

            <th className="p-3 text-left">
              Description
            </th>

            <th className="p-3 text-left">
              Banner Image
            </th>

            <th className="p-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Show empty message when no records exist */}
          {
            data.length === 0 ? (
              // Display message when no founder data exists
              <tr>
                <td colSpan={5} className="text-center p-8">
                  No Records Found
                </td>
              </tr>
            ):

            data.map(item => (
              <tr key={item._id} className="border-b">

                {/* Name Column */}
                <td className="p-3">
                  {
                    editingId === item._id ?
                      <input value={tempName} onChange={e => setTempName(e.target.value)} className="border py-1 bg-gray-100 px-3 rounded"/>
                      :item.name
                  }
                </td>

                {/* Designation Column */}
                <td className="p-3">
                  {
                    editingId === item._id ?
                      <input value={tempDesignation} onChange={e => setTempDesignation(e.target.value)} className="border py-1 bg-gray-100 px-3 rounded"/>
                      :item.designation
                  }
                </td>

                {/* Description Column */}
                <td className="p-3">
                  {
                    editingId === item._id ?
                      <textarea value={tempDescription} onChange={e => setTempDescription(e.target.value)} className="border py-1 bg-gray-100 px-3 rounded"/>
                      :item.description
                  }
                </td>

                {/* Images Column */}
                <td className="p-3">
                  {item === data[0] && (
                    <>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {(editingId === item._id ? tempImages : item.images).map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            className="w-16 h-16 rounded object-cover border"
                          />
                        ))}
                      </div>

                      {editingId === item._id && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditImages}
                        />
                      )}
                    </>
                  )}
                </td>

                {/* Action Buttons Column */}
                <td className="p-3">
                  {
                    editingId === item._id ?
                      (
                        <>
                          {/* Save updated founder details */}
                          <button onClick={handleSaveEdit} className="bg-green-600 text-white px-3 py-1 rounded mr-2 cursor-pointer">
                            Save
                          </button>

                          {/* Cancel editing */}
                          <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer">
                            Cancel
                          </button>
                        </>
                      ):(
                        <>
                          {/* Enable edit mode */}
                          <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer">
                            Edit
                          </button>

                          {/* Delete founder record */}
                          <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer">
                            Delete
                          </button>
                        </>
                      )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}