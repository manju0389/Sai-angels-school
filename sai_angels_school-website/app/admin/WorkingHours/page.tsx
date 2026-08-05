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
    React.SetStateAction<{
      label: string;
      time: string;
    }>
  >;
  onEdit: (gIndex: number, index: number) => void;
  onSave: (gIndex: number, index: number) => void;
  onCancel: () => void;
  onDelete: (gIndex: number, index: number) => void;
};

/* ================= ROW ================= */

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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
  });

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

      {/* Label */}
      <div className="flex-1">
        {isEditing ? (
          <input
            value={tempValue.label}
            onChange={(e) =>
              setTempValue({
                ...tempValue,
                label: e.target.value,
              })
            }
            className="border px-2 py-1 w-full"
          />
        ) : (
          item.label
        )}
      </div>

      {/* Time */}
      <div className="w-60 text-right">
        {isEditing ? (
          <input
            value={tempValue.time}
            onChange={(e) =>
              setTempValue({
                ...tempValue,
                time: e.target.value,
              })
            }
            className="border px-2 py-1 w-full text-right"
          />
        ) : (
          item.time
        )}
      </div>

      {/* Actions */}
      <div className="ml-4 flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={() => onSave(gIndex, index)}
              className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEdit(gIndex, index)}
              className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(gIndex, index)}
              className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
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
        const res = await fetch(
          "http://localhost:5000/api/admission/working-hours"
        );

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: { sections: Section[] } =
          await res.json();

        console.log(result);

        setData(result.sections || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);


  /* ================= SAVE DATABASE ================= */

  const saveData = async (updated: Section[]) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admission/working-hours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sections: updated,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();

      console.log("Saved:", result);

      setData(updated);

    } catch (error) {
      console.error("Save Error:", error);
    }
  };


  /* ================= SECTION ================= */

  const handleSectionEdit = (gIndex: number) => {
    setEditingSection(gIndex);
    setTempSectionTitle(data[gIndex].title);
  };


  const handleSectionSave = (gIndex: number) => {
    const updated = data.map((section, index) => {

      if (index !== gIndex) {
        return section;
      }

      return {
        ...section,
        title: tempSectionTitle,
      };

    });

    saveData(updated);

    setEditingSection(null);
  };


  const addSection = () => {

    const updated: Section[] = [
      ...data,
      {
        id: Date.now(),
        title: "New Section",
        items: [],
      },
    ];

    saveData(updated);
  };


  /* ================= DELETE SECTION ================= */

  const deleteSection = (gIndex: number) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this section?"
    );

    if (!confirmDelete) return;


    const updated = data.filter(
      (_, i) => i !== gIndex
    );

    saveData(updated);

    alert("Section deleted successfully ✅");
  };


  /* ================= ROW ================= */

  const addRow = (gIndex: number) => {

    const updated = data.map((group, index) => {

      if (index !== gIndex) {
        return group;
      }

      return {
        ...group,
        items: [
          ...group.items,
          {
            id: Date.now(),
            label: "New Item",
            time: "00.00 - 00.00",
          },
        ],
      };

    });

    saveData(updated);
  };


  /* ================= DELETE ROW ================= */

  const deleteRow = (
    gIndex: number,
    iIndex: number
  ) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;


    const updated = data.map((group, index) => {

      if (index !== gIndex) {
        return group;
      }


      return {
        ...group,
        items: group.items.filter(
          (_, i) => i !== iIndex
        ),
      };

    });


    saveData(updated);

    alert("Item deleted successfully ✅");
  };


  const handleEdit = (
    gIndex: number,
    iIndex: number
  ) => {

    setEditing({
      groupIndex: gIndex,
      itemIndex: iIndex,
    });


    setTempValue(
      data[gIndex].items[iIndex]
    );
  };


  const handleSave = (
    gIndex: number,
    iIndex: number
  ) => {

    const updated = data.map((group, index) => {

      if (index !== gIndex) {
        return group;
      }


      return {
        ...group,

        items: group.items.map((item, i) => {

          if (i !== iIndex) {
            return item;
          }


          return {
            ...item,
            label: tempValue.label,
            time: tempValue.time,
          };

        }),
      };

    });


    saveData(updated);

    setEditing({
      groupIndex: null,
      itemIndex: null,
    });
  };


  const handleCancel = () => {

    setEditing({
      groupIndex: null,
      itemIndex: null,
    });

  };
    /* ================= DRAG ================= */

  const handleDragEnd = (
    event: any,
    gIndex: number
  ) => {
    const {
      active,
      over,
    } = event;


    if (!over || active.id === over.id) {
      return;
    }


    const updated = data.map((group, index) => {

      if (index !== gIndex) {
        return group;
      }


      const oldIndex = group.items.findIndex(
        (item) => item.id === active.id
      );


      const newIndex = group.items.findIndex(
        (item) => item.id === over.id
      );


      return {
        ...group,
        items: arrayMove(
          group.items,
          oldIndex,
          newIndex
        ),
      };

    });


    saveData(updated);
  };


  return (
    <div className="p-6">

      <h2 className="text-4xl mb-4">
        Working Hours
      </h2>


      <hr className="mb-6" />


      {/* Add section */}
      <button
        onClick={addSection}
        className="bg-black text-white px-4 py-2 rounded mb-6 cursor-pointer"
      >
        + Add Section
      </button>


      {/* Sections */}
      <div className="space-y-10">

        {data.map((group, gIndex) => (

          <div
            key={group.id}
            className="bg-white p-6 shadow rounded"
          >

            {/* Section header */}
            <div className="flex justify-between mb-4">

              {editingSection === gIndex ? (

                <input
                  value={tempSectionTitle}
                  onChange={(e) =>
                    setTempSectionTitle(e.target.value)
                  }
                  className="border px-2 py-1"
                />

              ) : (

                <h3 className="font-semibold">
                  {group.title}
                </h3>

              )}


              {/* Section buttons */}
              <div className="flex gap-2 cursor-pointer">

                {editingSection === gIndex ? (

                  <>

                    <button
                      onClick={() =>
                        handleSectionSave(gIndex)
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Save
                    </button>


                    <button
                      onClick={() =>
                        setEditingSection(null)
                      }
                      className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Cancel
                    </button>

                  </>


                ) : (

                  <>

                    <button
                      onClick={() =>
                        handleSectionEdit(gIndex)
                      }
                      className="bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Edit Section
                    </button>


                    <button
                      onClick={() =>
                        addRow(gIndex)
                      }
                      className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      + Add Row
                    </button>


                    <button
                      onClick={() =>
                        deleteSection(gIndex)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>

                  </>

                )}

              </div>

            </div>


            {/* Drag and drop */}
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(e) =>
                handleDragEnd(e, gIndex)
              }
            >

              <SortableContext
                items={
                  group.items.map(
                    (item) => item.id
                  )
                }
                strategy={
                  verticalListSortingStrategy
                }
              >

                <div className="space-y-3 cursor-pointer">

                  {group.items.map(
                    (item, index) => (

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

                    )
                  )}

                </div>

              </SortableContext>

            </DndContext>


          </div>

        ))}

      </div>

    </div>
  );
}