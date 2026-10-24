
import Achievement from "../models/Achievement.js";
import cloudinary from "../config/cloudinary.js";

// ==============================
// CREATE Achievement
// ==============================
export const createAchievement = async (req, res) => {
  try {
    const { year } = req.body;

    // Ensure at least one image is uploaded.
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image",
      });
    }

    // Store Cloudinary image URLs and public IDs.
    const images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    // Create the achievement in MongoDB.
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
    // Return the newest achievements first.
    const data = await Achievement.find().sort({
      createdAt: -1,
    });

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

    // Find the existing achievement.
    const achievement = await Achievement.findById(id);

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    // Update the year only when provided.
    const updateData = {};

    if (year !== undefined) {
      updateData.year = year;
    }

    // Replace existing images when new files are uploaded.
    if (req.files && req.files.length > 0) {
      // Delete the old images from Cloudinary.
      for (const image of achievement.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Save the newly uploaded image details.
      updateData.images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    // Save the updated achievement.
    const updated = await Achievement.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

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
    // Find the achievement before deleting its images.
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    // Delete every associated image from Cloudinary.
    for (const image of achievement.images) {
      const result = await cloudinary.uploader.destroy(
        image.public_id
      );

      // Stop if Cloudinary reports that deletion failed.
      if (
        result.result !== "ok" &&
        result.result !== "not found"
      ) {
        throw new Error(
          `Failed to delete Cloudinary image: ${image.public_id}`
        );
      }
    }

    // Delete the MongoDB document after processing its images.
    await Achievement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message:
        "Achievement and associated Cloudinary images deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
