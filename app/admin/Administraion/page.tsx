
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define facility data type
interface Facility {
  _id: string;
  facility: string;
}

export default function Administration() {
  // API endpoint
  const API = `${process.env.NEXT_PUBLIC_API_URL}/about-us/administration`;

  // Store new facility input
  const [facility, setFacility] = useState("");

  // Store fetched facilities
  const [data, setData] = useState<Facility[]>([]);

  // Track selected row for editing
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Store temporary edited value
  const [tempValue, setTempValue] = useState("");

  // Track loading state
  const [loading, setLoading] = useState(false);

  // Fetch administration facilities from the API
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Unable to load administration data.");
    } finally {
      setLoading(false);
    }
  };

  // Load data when the page opens
  useEffect(() => {
    fetchData();
  }, []);

  // Add a new facility to MongoDB
  const handleAdd = async () => {
    if (!facility.trim()) {
      alert("Please enter facility name.");
      return;
    }

    try {
      await axios.post(API, {
        facility: facility.trim(),
      });

      setFacility("");
      alert("Facility added successfully!");

      // Refresh the facility list
      await fetchData();
    } catch (error) {
      console.error("Add error:", error);
      alert("Unable to add facility.");
    }
  };

  // Delete a facility from MongoDB after confirmation
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this facility from MongoDB?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API}/${id}`);

      // Show success only after the server confirms deletion
      alert(response.data.message || "Facility deleted successfully!");

      // Refresh the facility list
      await fetchData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete facility.");
    }
  };

  // Enable edit mode and load the existing value
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempValue(data[index].facility);
  };

  // Save updated facility to MongoDB
  const handleSave = async (id: string) => {
    if (!tempValue.trim()) {
      alert("Facility name cannot be empty.");
      return;
    }

    try {
      await axios.put(`${API}/${id}`, {
        facility: tempValue.trim(),
      });

      alert("Facility updated successfully!");

      // Exit edit mode
      setEditingIndex(null);
      setTempValue("");

      // Refresh the updated data
      await fetchData();
    } catch (error) {
      console.error("Update error:", error);
      alert("Unable to update facility.");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingIndex(null);
    setTempValue("");
  };

  return (
    <div className="p-6">
      {/* Page heading */}
      <h2 className="mb-6 text-4xl font-bold">
        Administration Page
      </h2>

      {/* Add facility section */}
      <div className="mb-6 flex gap-3">
        <input value={facility} onChange={(e) => setFacility(e.target.value)}
          placeholder="Enter facility / feature" className="h-10 w-full rounded border bg-gray-100 px-3"
        />

        <button onClick={handleAdd} className="cursor-pointer rounded bg-blue-600 px-5 text-white hover:bg-blue-700" >
          Add
        </button>
      </div>

      {/* Facilities table */}
      <table className="min-w-full border">
        {/* Table header */}
        <thead className="bg-blue-900 text-white">
          <tr>
            <th scope="col" className="p-3 text-left">
              Facilities / Features
            </th>
            <th scope="col" className="p-3">
              Action
            </th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2} className="p-5 text-center">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={2} className="p-5 text-center">
                No Records Found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item._id}>
                <td className="border p-3">
                  <span aria-hidden="true">▶</span>{" "}

                  {editingIndex === index ? (
                    // Input for editing a facility
                    <input value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="border px-2" />
                  ) : (
                    item.facility
                  )}
                </td>

                <td className="border p-3 text-center">
                  {editingIndex === index ? (
                    // Save or cancel editing
                    <>
                      <button onClick={() => handleSave(item._id)} className="mr-2 cursor-pointer rounded bg-green-600 px-3 py-1 text-white" >
                        Save
                      </button>

                      <button onClick={handleCancel} className="cursor-pointer rounded bg-gray-500 px-3 py-1 text-white" >
                        Cancel
                      </button>
                    </>
                  ) : (
                    // Edit or delete a facility
                    <>
                      <button onClick={() => handleEdit(index)} className="mr-2 cursor-pointer rounded bg-blue-500 px-3 py-1 text-white" >
                        Edit
                      </button>

                      <button onClick={() => handleDelete(item._id)} className="cursor-pointer rounded bg-red-600 px-3 py-1 text-white" >
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
