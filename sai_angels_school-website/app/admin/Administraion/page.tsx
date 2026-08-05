"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

  // Loading state
  const [loading, setLoading] = useState(false);


  // Fetch administration facilities
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);
      setData(res.data);

    } catch (error) {
      console.log("Fetch error:", error);
      alert("Unable to load administration data.");

    } finally {
      setLoading(false);
    }
  };

  // Load data when page opens
  useEffect(() => {
    fetchData();
  }, []);

  // Add new facility
  const handleAdd = async () => {

    if (!facility.trim()) {
      alert("Please enter facility name");
      return;
    }

    try {
      await axios.post(API, {
        facility: facility.trim(),
      });

      setFacility("");

      // Refresh list after adding
      fetchData();

    } catch (error) {
      alert("Unable to add facility");
    }
  };

  // Delete facility with confirmation alert
  const handleDelete = async (id: string) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this facility?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);

      alert("Facility deleted successfully");

      // Refresh list after deleting
      fetchData();

    } catch (error) {
      alert("Unable to delete facility");
    }
  };

  // Enable edit mode
  const handleEdit = (index: number) => {
    setEditingIndex(index);

    // Load existing value into input
    setTempValue(data[index].facility);
  };

  // Save updated facility
  const handleSave = async (id: string) => {

    if (!tempValue.trim()) {
      alert("Facility name cannot be empty");
      return;
    }

    try {
      await axios.put(`${API}/${id}`, {
        facility: tempValue.trim(),
      });

      alert("Facility updated successfully");

      // Exit edit mode
      setEditingIndex(null);
      setTempValue("");

      // Refresh updated data
      fetchData();

    } catch (error) {
      alert("Unable to update facility");
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
      <h2 className="text-4xl mb-6 font-bold">
        Administration Page
      </h2>


      {/* Add facility section */}
      <div className="flex gap-3 mb-6">

        <input
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
          placeholder="Enter facility / feature"
          className="h-10 bg-gray-100 border px-3 rounded w-full"/>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded cursor-pointer">
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

            // Loading message
            <tr>
              <td colSpan={2} className="text-center p-5">
                Loading...
              </td>
            </tr>

          ) : data.length === 0 ? (

            // Empty data message
            <tr>
              <td colSpan={2} className="text-center p-5">
                No Records Found
              </td>
            </tr>

          ) : (

            // Display facility records
            data.map((item, index) => (

              <tr key={item._id}>
                <td className="border p-3">
                  <span aria-hidden="true">
                    ▶
                  </span>

                  {editingIndex === index ? (
                    // Edit input
                    <input value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)
                      }
                      className="border px-2"
                    />

                  ) : (

                    item.facility
                  )}
                </td>

                <td className="border p-3 text-center">
                  {editingIndex === index ? (

                    // Save / Cancel buttons
                    <>
                      <button onClick={() => handleSave(item._id)} className="bg-green-600 text-white px-3 py-1 rounded mr-2 cursor-pointer">
                        Save
                      </button>

                      <button onClick={handleCancel} className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer">
                        Cancel
                      </button>
                    </>

                  ) : (

                    // Edit / Delete buttons
                    <>
                      <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer">
                        Edit
                      </button>

                      <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer">
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