
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Types for working hours data.
interface Item {
  id: number;
  label: string;
  time: string;
}

interface Section {
  id: number;
  title: string;
  items: Item[];
}

interface SortableRowProps {
  item: Item;
  index: number;
  gIndex: number;
  editing: {
    groupIndex: number | null;
    itemIndex: number | null;
  };
  tempValue: {
    label: string;
    time: string;
  };
  setTempValue: React.Dispatch<
    React.SetStateAction<{ label: string; time: string }>
  >;
  onEdit: (gIndex: number, index: number) => void;
  onSave: (gIndex: number, index: number) => void;
  onCancel: () => void;
  onDelete: (gIndex: number, index: number) => void;
}

// Use NEXT_PUBLIC_API_URL=http://localhost:5000/api locally.
// In production, set it to your deployed backend's API base URL.
const API = `${process.env.NEXT_PUBLIC_API_URL}/admission/working-hours`;

/* ================= SORTABLE ROW ================= */

function SortableRow({
  item,
  index,
  gIndex,
  editing,
  tempValue,
  setTempValue,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: SortableRowProps) {
  // Connect this row to the drag-and-drop system.
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isEditing =
    editing.groupIndex === gIndex &&
    editing.itemIndex === index;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex justify-between items-center px-4 py-3 rounded-md ${
        index % 2 === 0 ? "bg-gray-200" : "bg-white"
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab pr-3"
      >
        ☰
      </div>

      {/* Edit the item label */}
      <div className="flex-1">
        {isEditing ? (
          <input value={tempValue.label}
            onChange={(e) =>
              setTempValue((prev) => ({
                ...prev,
                label: e.target.value,
              }))
            }
            className="border px-2 py-1 w-full"
          />
        ) : (
          item.label
        )}
      </div>

      {/* Edit the item time */}
      <div className="w-60 text-right">
        {isEditing ? (
          <input value={tempValue.time}
            onChange={(e) =>
              setTempValue((prev) => ({
                ...prev,
                time: e.target.value,
              }))
            }
            className="border px-2 py-1 w-full text-right"
          />
        ) : (
          item.time
        )}
      </div>

      {/* Item actions */}
      <div className="ml-4 flex gap-2">
        {isEditing ? (
          <>
            <button onClick={() => onSave(gIndex, index)} className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer" >
              Save
            </button>

            <button onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer" >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onEdit(gIndex, index)} className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer" >
              Edit
            </button>

            <button onClick={() => onDelete(gIndex, index)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer" >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= ADMIN PAGE ================= */

export default function WorkingHours() {
  const [data, setData] = useState<Section[]>([]);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [tempSectionTitle, setTempSectionTitle] = useState("");
  const [editing, setEditing] = useState({
    groupIndex: null as number | null,
    itemIndex: null as number | null,
  });
  const [tempValue, setTempValue] = useState({
    label: "",
    time: "",
  });

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(API);

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: { sections: Section[] } = await res.json();
        setData(result.sections || []);
      } catch (error) {
        console.error("Load Error:", error);
        alert("Unable to load working hours from MongoDB.");
      }
    };

    loadData();
  }, []);

  /* ================= SAVE TO MONGODB ================= */

  // Return true only if the server confirms a successful save.
  const saveData = async (updated: Section[]): Promise<boolean> => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sections: updated }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message || `HTTP Error: ${response.status}`
        );
      }

      // Update the UI only after the database save succeeds.
      setData(result.data?.sections ?? updated);
      return true;
    } catch (error) {
      console.error("Save Error:", error);
      alert(
        error instanceof Error
          ? `Failed to save working hours: ${error.message}`
          : "Failed to save working hours."
      );
      return false;
    }
  };

  /* ================= SECTION ACTIONS ================= */

  const handleSectionEdit = (gIndex: number) => {
    setEditingSection(gIndex);
    setTempSectionTitle(data[gIndex].title);
  };

  const handleSectionSave = async (gIndex: number) => {
    const updated = data.map((section, index) =>
      index === gIndex
        ? { ...section, title: tempSectionTitle }
        : section
    );

    if (await saveData(updated)) {
      setEditingSection(null);
      alert("Section updated successfully!");
    }
  };

  const addSection = async () => {
    const updated: Section[] = [
      ...data,
      {
        id: Date.now(),
        title: "New Section",
        items: [],
      },
    ];

    if (await saveData(updated)) {
      alert("Section added successfully!");
    }
  };

  /* ================= DELETE SECTION ================= */

  const deleteSection = async (gIndex: number) => {
    // Ask for confirmation before removing the section.
    const confirmed = window.confirm(
      "Are you sure you want to delete this section from MongoDB?"
    );

    if (!confirmed) return;

    const updated = data.filter((_, index) => index !== gIndex);

    // Show success only after MongoDB confirms the deletion.
    if (await saveData(updated)) {
      if (editingSection === gIndex) {
        setEditingSection(null);
      }

      alert("Section deleted successfully from MongoDB!");
    }
  };

  /* ================= ADD ITEM ================= */

  const addRow = async (gIndex: number) => {
    const updated = data.map((group, index) =>
      index === gIndex
        ? {
            ...group,
            items: [
              ...group.items,
              {
                id: Date.now(),
                label: "New Item",
                time: "00.00 - 00.00",
              },
            ],
          }
        : group
    );

    if (await saveData(updated)) {
      alert("Working hours item added successfully!");
    }
  };

  /* ================= DELETE ITEM ================= */

  const deleteRow = async (gIndex: number, iIndex: number) => {
    // Confirm before deleting an item.
    const confirmed = window.confirm(
      "Are you sure you want to delete this item from MongoDB?"
    );

    if (!confirmed) return;

    const updated = data.map((group, index) =>
      index === gIndex
        ? {
            ...group,
            items: group.items.filter((_, i) => i !== iIndex),
          }
        : group
    );

    if (await saveData(updated)) {
      setEditing({
        groupIndex: null,
        itemIndex: null,
      });

      alert("Working hours item deleted successfully from MongoDB!");
    }
  };

  /* ================= EDIT ITEM ================= */

  const handleEdit = (gIndex: number, iIndex: number) => {
    setEditing({
      groupIndex: gIndex,
      itemIndex: iIndex,
    });

    setTempValue({ ...data[gIndex].items[iIndex] });
  };

  const handleSave = async (gIndex: number, iIndex: number) => {
    const updated = data.map((group, index) =>
      index === gIndex
        ? {
            ...group,
            items: group.items.map((item, i) =>
              i === iIndex
                ? {
                    ...item,
                    label: tempValue.label,
                    time: tempValue.time,
                  }
                : item
            ),
          }
        : group
    );

    if (await saveData(updated)) {
      setEditing({
        groupIndex: null,
        itemIndex: null,
      });

      alert("Working hours item updated successfully!");
    }
  };

  const handleCancel = () => {
    setEditing({
      groupIndex: null,
      itemIndex: null,
    });
  };

  /* ================= DRAG AND DROP ================= */

  const handleDragEnd = async (event: any, gIndex: number) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const updated = data.map((group, index) => {
      if (index !== gIndex) return group;

      const oldIndex = group.items.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = group.items.findIndex(
        (item) => item.id === over.id
      );

      if (oldIndex < 0 || newIndex < 0) return group;

      return {
        ...group,
        items: arrayMove(group.items, oldIndex, newIndex),
      };
    });

    if (await saveData(updated)) {
      alert("Working hours order saved successfully!");
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="p-6">
      <h2 className="text-4xl mb-4">Working Hours</h2>
      <hr className="mb-6" />

      {/* Add a new section */}
      <button onClick={addSection} className="bg-black text-white px-4 py-2 rounded mb-6 cursor-pointer" >
        + Add Section
      </button>

      {/* Render all working hours sections */}
      <div className="space-y-10">
        {data.map((group, gIndex) => (
          <div key={group.id} className="bg-white p-6 shadow rounded">
            {/* Section title and controls */}
            <div className="flex justify-between mb-4">
              {editingSection === gIndex ? (
                <input value={tempSectionTitle} onChange={(e) => setTempSectionTitle(e.target.value)}
                  className="border px-2 py-1"
                />
              ) : (
                <h3 className="font-semibold">{group.title}</h3>
              )}

              <div className="flex gap-2">
                {editingSection === gIndex ? (
                  <>
                    <button onClick={() => handleSectionSave(gIndex)} className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer" >
                      Save
                    </button>

                    <button onClick={() => setEditingSection(null)} className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer" >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleSectionEdit(gIndex)} className="bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer" >
                      Edit Section
                    </button>

                    <button onClick={() => addRow(gIndex)} className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer" >
                      + Add Row
                    </button>

                    <button onClick={() => deleteSection(gIndex)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer" >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Sortable items for this section */}
            <DndContext collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, gIndex)}
            >
              <SortableContext
                items={group.items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {group.items.map((item, index) => (
                    <SortableRow
                      key={item.id}
                      item={item}
                      index={index}
                      gIndex={gIndex}
                      editing={editing}
                      tempValue={tempValue}
                      setTempValue={setTempValue}
                      onEdit={handleEdit}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      onDelete={deleteRow}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        ))}
      </div>
    </div>
  );
}