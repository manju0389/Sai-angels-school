"use client";

import { useCallback, useEffect, useState } from "react";

interface PDFType {
  _id: string;
  title: string;
  slug: string;
  pdf_url: string;
}

export default function PDFManagement() {
  
  const API = `${process.env.NEXT_PUBLIC_API_URL}/cbse-documents`;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<PDFType[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch the current PDF list from the backend.
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to load PDFs.");
      }

      setData(
        Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.documents)
              ? result.documents
              : []
      );
    } catch (error) {
      console.error("Fetch error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to load PDFs."
      );
    }
  }, [API]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Upload a new PDF or replace the document for the selected page.
  const handleUpload = async () => {
    if (!title.trim() || !slug || !file) {
      alert("Please enter a title, select a page, and choose a PDF.");
      return;
    }

    if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("slug", slug);
    formData.append("folder", "PDF");
    formData.append("pdf", file);

    try {
      const res = await fetch(API, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "PDF upload failed.");
      }

      alert(result.message || "PDF uploaded successfully.");

      setTitle("");
      setSlug("");
      setFile(null);

      // Clear the file input and refresh the table.
      const input = document.getElementById(
        "pdf-file"
      ) as HTMLInputElement | null;

      if (input) input.value = "";

      await fetchData();
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        error instanceof Error ? error.message : "Server error."
      );
    } finally {
      setLoading(false);
    }
  };

  // Confirm deletion before asking the backend to remove the Cloudinary
  // file and its MongoDB record.
  const handleDelete = async (item: PDFType) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"?\n\n` +
      "This will permanently remove the PDF from Cloudinary and " +
      "delete its MongoDB record."
    );

    if (!confirmed) return;

    setDeletingId(item._id);

    try {
      const res = await fetch(`${API}/${item._id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "PDF deletion failed.");
      }

      alert(result.message || "PDF deleted successfully.");

      // Refresh the table only after the server confirms deletion.
      await fetchData();
    } catch (error) {
      console.error("Delete error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Server error while deleting the PDF."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h2 className="mb-5 text-3xl font-bold text-[#102c50]">
        PDF Management
      </h2>

      <hr className="mb-6" />

      <div className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
        <label htmlFor="pdf-title" className="mb-2 block font-medium">
          PDF Title
        </label>

        <input id="pdf-title" placeholder="Enter PDF title" value={title}
          onChange={(e) => setTitle(e.target.value)} className="mb-4 h-11 w-full rounded border px-3"
        />

        <label htmlFor="pdf-page" className="mb-2 block font-medium">
          Select Page
        </label>
        <select id="pdf-page" value={slug} onChange={(e) => setSlug(e.target.value)}
          className="mb-4 h-11 w-full rounded border px-3 cursor-pointer"
        >
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
          <option value="academic-calendar">Annual Academic Calendar</option>
          <option value="smc">School Management Committee</option>
          <option value="pta">Parents Teachers Association</option>
          <option value="results">Three Years Result</option>
          <option value="geo-tagged-infrastructure">Geo Tagged Infrastructure</option>
        </select>

        <label htmlFor="pdf-file" className="mb-2 block font-medium cursor-pointer">
          Select PDF File
        </label>
        <input id="pdf-file" type="file" accept=".pdf,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-5 block w-full rounded border p-2 cursor-pointer"
        />

        <button type="button" onClick={handleUpload} disabled={loading}
          className="cursor-pointer rounded bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>

      <h3 className="mb-4 text-xl font-bold text-[#102c50]">
        Uploaded Documents
      </h3>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[650px] bg-white text-left">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Page</th>
              <th className="p-3">PDF</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.slug}</td>
                  <td className="p-3">
                    <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline" >
                      View PDF
                    </a>
                  </td>

                  <td className="p-3">
                    <button type="button" onClick={() => handleDelete(item)}
                      disabled={deletingId !== null} className="cursor-pointer rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      {deletingId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No PDF documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}