import Administration from "../models/Administration.js";

// GET ALL ADMINISTRATION RECORDS
export const getAdministrations = async (req, res) => {
  try {
    const data = await Administration.find();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD ADMINISTRATION RECORD
export const addAdministration = async (req, res) => {
  try {
    const { facility } = req.body;

    // Validate facility input
    if (!facility) {
      return res.status(400).json({
        message: "Facility is required",
      });
    }

    // Create new facility record
    const newFacility = await Administration.create({
      facility,
    });

    res.status(201).json(newFacility);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE ADMINISTRATION RECORD
export const updateAdministration = async (req, res) => {
  try {
    const { id } = req.params;
    const { facility } = req.body;

    // Update facility by ID
    const updated = await Administration.findByIdAndUpdate(
      id,
      {
        facility,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE ADMINISTRATION RECORD
export const deleteAdministration = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete facility by ID
    await Administration.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};