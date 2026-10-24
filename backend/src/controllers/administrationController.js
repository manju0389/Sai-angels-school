
import mongoose from "mongoose";
import Administration from "../models/Administration.js";

// GET: Retrieve all administration records
export const getAdministrations = async (req, res) => {
  try {
    const data = await Administration.find();

    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch error:", error);

    res.status(500).json({
      message: "Unable to fetch administration records.",
    });
  }
};

// POST: Add a new administration record to MongoDB
export const addAdministration = async (req, res) => {
  try {
    const { facility } = req.body;

    // Validate the facility name
    if (typeof facility !== "string" || !facility.trim()) {
      return res.status(400).json({
        message: "Facility is required.",
      });
    }

    // Create and save the new facility
    const newFacility = await Administration.create({
      facility: facility.trim(),
    });

    res.status(201).json({
      message: "Facility added successfully!",
      data: newFacility,
    });
  } catch (error) {
    console.error("Add error:", error);

    res.status(500).json({
      message: "Unable to add facility.",
    });
  }
};

// PUT: Update an existing administration record
export const updateAdministration = async (req, res) => {
  try {
    const { id } = req.params;
    const { facility } = req.body;

    // Validate the MongoDB document ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid facility ID.",
      });
    }

    // Validate the updated facility name
    if (typeof facility !== "string" || !facility.trim()) {
      return res.status(400).json({
        message: "Facility name is required.",
      });
    }

    // Update the record and return the updated document
    const updated = await Administration.findByIdAndUpdate(
      id,
      { facility: facility.trim() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Facility not found.",
      });
    }

    res.status(200).json({
      message: "Facility updated successfully!",
      data: updated,
    });
  } catch (error) {
    console.error("Update error:", error);

    res.status(500).json({
      message: "Unable to update facility.",
    });
  }
};

// DELETE: Permanently delete a facility from MongoDB
export const deleteAdministration = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the MongoDB document ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid facility ID.",
      });
    }

    // Delete the facility from MongoDB
    const deleted = await Administration.findByIdAndDelete(id);

    // Return an error if no record was deleted
    if (!deleted) {
      return res.status(404).json({
        message: "Facility not found.",
      });
    }

    // Send success only after MongoDB deletion succeeds
    res.status(200).json({
      message: "Facility deleted successfully from MongoDB!",
    });
  } catch (error) {
    console.error("Delete error:", error);

    res.status(500).json({
      message: "Unable to delete facility from MongoDB.",
    });
  }
};
