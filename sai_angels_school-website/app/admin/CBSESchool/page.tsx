"use client";

import { useEffect, useState } from "react";

interface PDFType {
  _id: string;
  title: string;
  slug: string;
  pdf_url: string;
}

export default function PDFManagement() {
  // API Base URL
  const API = `${process.env.NEXT_PUBLIC_API_URL}/cbse-documents`;

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Store fetched PDF data
  const [data, setData] = useState<PDFType[]>([]);

  // Fetch PDFs when component loads
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all uploaded PDFs
  const fetchData = async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();

      console.log("Response:", result);

      // Handle different possible API response structures
      if (Array.isArray(result)) {
        setData(result);
      } else if (Array.isArray(result.data)) {
        setData(result.data);
      } else if (Array.isArray(result.documents)) {
        setData(result.documents);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setData([]);
    }
  };

  // Upload new PDF
  const handleUpload = async () => {
    console.log("Title:", title);
    console.log("Slug:", slug);
    console.log("File:", file);

    // Validate required fields
    if (!title || !slug || !file) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("folder", "PDF");
    formData.append("pdf", file);
    
    try {
      const res = await fetch(API, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      console.log("Upload response:", text);

      if (res.ok) {
        alert("PDF uploaded successfully");
        // Reset form after successful upload
        setTitle("");
        setSlug("");
        setFile(null);

        // Refresh PDF list
        fetchData();
      } else {
        alert(text || "Upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      alert("Server error");
    }
  };

  // Delete PDF
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this PDF?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        alert("PDF deleted successfully");
        // Refresh list after deletion
        fetchData();
      } else {
        alert(result.message || "Delete failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl mb-5">PDF Management</h2>

      <hr className="mb-6" />
      {/* PDF Title */}
      <input placeholder="PDF Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 bg-gray-200 px-3 mb-4" />

      {/* Select page/slug */}
      <select value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full h-10 bg-gray-200 px-3 mb-4" >
        <option value="">Select Page</option>
        <option value="mandatory-disclosure">Mandatory Disclosure</option>
        <option value="affiliation-certificate">Affiliation Certificate</option>
        <option value="society-trust-certificate">Societies/Trust Certificate</option>
        <option value="noc">No Objection Certificate</option>
        <option value="recognition-certificate">Recognition Certificate</option>
        <option value="building-certificate">Building Certificate</option>
        <option value="fire-certificate">Fire Certificate</option>
        <option value="deo-certificate">DEO Certificate</option>
        <option value="health-certificate">Water Health Certificate</option>
        <option value="water-certificate">Water Certificate</option>
        <option value="fee-structure">Fee Structure</option>
        <option value="academic-calendar">Annual Academic Calender</option>
        <option value="smc">School Management Committee</option>
        <option value="pta">Parents Teachers Association</option>
        <option value="results">Three years Result</option>
        <option value="geo-tagged-infrastructure">Geo tagged infrastructure</option>
      </select>

      {/* PDF File */}
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-5 w-full border h-10 bg-gray-200 px-3 mb-4" />

      {/* Upload Button */}
      <button onClick={handleUpload} className="bg-blue-600 text-white px-5 py-2 rounded cursor-pointer" >
        Upload PDF
      </button>

      {/* Uploaded PDFs Table */}
      <table className="w-full mt-8 bg-gray-100">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-3">Title</th>
            <th>Page</th>
            <th>PDF</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="border">
              <td className="p-3">{item.title}</td>

              <td>{item.slug}</td>

              <td>
                <a href={item.pdf_url} target="_blank" className="text-blue-600" >
                  View PDF
                </a>
              </td>

              <td>
                <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer" >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}