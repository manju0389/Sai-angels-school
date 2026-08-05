import PhotoGallery from "../models/PhotoGallery.js";
import cloudinary from "../config/cloudinary.js";

// Get all photos
export const getPhotos = async (req, res) => {
  try {
    // Fetch all photos and sort by latest uploads
    const photos = await PhotoGallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: photos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single photo by ID
export const getPhoto = async (req, res) => {
  try {
    // Find photo using MongoDB ID
    const photo = await PhotoGallery.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    res.json({
      success: true,
      data: photo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new photo
export const createPhoto = async (req, res) => {
  try {
    // Check if image file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required",
      });
    }

    // Save photo details in database
    const photo = await PhotoGallery.create({
      title: req.body.title,
      category: req.body.category,
      image: req.file.path,
      public_id: req.file.filename,
    });

    res.status(201).json({
      success: true,
      data: photo,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update existing photo
export const updatePhoto = async (req, res) => {
  try {
    // Fields that can be updated
    const updateData = {
      title: req.body.title,
      category: req.body.category,
    };

    // Update image details if a new image is uploaded
    if (req.file) {
      updateData.image = req.file.path;
      updateData.public_id = req.file.filename;
    }

    // Find and update photo
    const photo = await PhotoGallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    res.json({
      success: true,
      data: photo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete photo
export const deletePhoto = async (req, res) => {
  try {
    // Find photo before deleting
    const photo = await PhotoGallery.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    // Delete image from Cloudinary
    if (photo.public_id) {
      await cloudinary.uploader.destroy(photo.public_id);
    }

    // Delete photo record from MongoDB
    await PhotoGallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};