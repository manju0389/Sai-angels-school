import WorkingHours from "../models/WorkingHours.js";

// Get working hours
export const getWorkingHours = async (req, res) => {
  try {
    // Fetch existing working hours data
    const data = await WorkingHours.findOne();

    // Return empty sections if no data exists
    if (!data) {
      return res.json({
        sections: [],
      });
    }

    // Send working hours data
    res.json(data);
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      message: error.message,
    });
  }
};

// Save working hours
export const saveWorkingHours = async (req, res) => {
  try {
    // Get sections from request body
    const { sections } = req.body;

    // Check if working hours already exist
    let data = await WorkingHours.findOne();

    if (data) {
      // Update existing working hours
      data.sections = sections;
      await data.save();
    } else {
      // Create new working hours record
      data = await WorkingHours.create({
        sections,
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      message: error.message,
    });
  }
};