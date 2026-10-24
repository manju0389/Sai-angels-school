import WorkingHours from "../models/WorkingHours.js";

// Get the working hours stored in MongoDB.
export const getWorkingHours = async (req, res) => {
  try {
    const data = await WorkingHours.findOne();

    // Return an empty list if no record exists.
    if (!data) {
      return res.status(200).json({ sections: [] });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Get Working Hours Error:", error);

    return res.status(500).json({
      message: "Failed to fetch working hours.",
    });
  }
};

// Create or update the working hours in MongoDB.
export const saveWorkingHours = async (req, res) => {
  try {
    const { sections } = req.body;

    // Validate the request before saving.
    if (!Array.isArray(sections)) {
      return res.status(400).json({
        success: false,
        message: "Sections must be an array.",
      });
    }

    // Update the existing record, or create the first record.
    const data = await WorkingHours.findOneAndUpdate(
      {},
      { $set: { sections } },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    // Return success only after MongoDB has saved the change.
    return res.status(200).json({
      success: true,
      message: "Working hours saved successfully.",
      data,
    });
  } catch (error) {
    console.error("Save Working Hours Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save working hours.",
    });
  }
};