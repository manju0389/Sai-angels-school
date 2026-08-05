import SaiCherubsInternational from "../models/SaiCherubsInternational.js";
import cloudinary from "../config/cloudinary.js";

// Get all Sai Cherubs International records
export const getAllSaiCherubs = async (req, res) => {
  try {
    const data = await SaiCherubsInternational.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new Sai Cherubs International record
export const createSaiCherubs = async (req, res) => {
  try {
    const { title, date } = req.body;

    // Store Cloudinary image URL and public ID
    const images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    // Create new database record
    const data = await SaiCherubsInternational.create({
      title,
      date,
      images,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an existing Sai Cherubs International record
export const updateSaiCherubs = async (req, res) => {
  try {
    // Find existing record
    const oldData = await SaiCherubsInternational.findById(req.params.id);

    if (!oldData) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // Update text fields
    const updateData = {
      title: req.body.title,
      date: req.body.date,
    };

    // Replace images if new images are uploaded
    if (req.files.length) {
      // Delete old Cloudinary images
      for (const img of oldData.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      // Save new Cloudinary image details
      updateData.images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    // Update MongoDB record
    const updated = await SaiCherubsInternational.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a Sai Cherubs International record
export const deleteSaiCherubs = async (req, res) => {
  try {
    // Find record before deleting
    const data = await SaiCherubsInternational.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // Delete images from Cloudinary
    for (const img of data.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // Delete record from MongoDB
    await SaiCherubsInternational.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};