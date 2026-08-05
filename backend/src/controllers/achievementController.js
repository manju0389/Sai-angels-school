import Achievement from "../models/Achievement.js";
import cloudinary from "../config/cloudinary.js";

// ==============================
// CREATE Achievement
// ==============================
export const createAchievement = async (req, res) => {
  try {
    const { year } = req.body;

    // Ensure at least one image is uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image",
      });
    }

    // Store uploaded image details
    const images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    // Create achievement document
    const data = await Achievement.create({
      year,
      images,
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// GET All Achievements
// ==============================
export const getAchievements = async (req, res) => {
  try {
    // Fetch all achievements (latest first)
    const data = await Achievement.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// UPDATE Achievement
// ==============================
export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { year } = req.body;

    // Find achievement by ID
    const achievement = await Achievement.findById(id);

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    // Data to update
    const updateData = { year };

    // Replace images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      for (const image of achievement.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Save new image details
      updateData.images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    // Update achievement document
    const updated = await Achievement.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==============================
// DELETE Achievement
// ==============================
export const deleteAchievement = async (req, res) => {
  try {
    // Find achievement by ID
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    // Delete all associated images from Cloudinary
    for (const image of achievement.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Delete achievement document
    await Achievement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Achievement deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};