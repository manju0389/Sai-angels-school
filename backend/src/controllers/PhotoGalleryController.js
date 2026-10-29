
import PhotoGallery from "../models/PhotoGallery.js";
import cloudinary from "../config/cloudinary.js";

// Get all photos: newest year first, then newest upload first
export const getPhotoGallery = async (req, res) => {
  try {
    const images = await PhotoGallery.find().sort({
      year: -1,
      createdAt: -1,
      _id: -1,
    });

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one photo
export const getPhoto = async (req, res) => {
  try {
    const photo = await PhotoGallery.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    res.status(200).json({
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

// Upload a new photo with its manually selected year

export const createPhoto = async (req, res) => {
  try {
    const { title, category, year } = req.body;

    if (!title?.trim() || !category?.trim() || !year) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and year are required",
      });
    }

    if (!/^\d{4}$/.test(String(year))) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid four-digit year",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    const photos = await PhotoGallery.insertMany(
      req.files.map((file) => ({
        title: title.trim(),
        category: category.trim(),
        year: String(year),
        image: file.path,
        public_id: file.filename,
      }))
    );

    return res.status(201).json({
      success: true,
      message: "Gallery images uploaded successfully",
      data: photos,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update title, category, year, and optionally image
export const updatePhoto = async (req, res) => {
  try {
    const { title, category, year } = req.body;

    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title is required",
        });
      }

      updateData.title = title.trim();
    }

    if (category !== undefined) {
      if (!category.trim()) {
        return res.status(400).json({
          success: false,
          message: "Category is required",
        });
      }

      updateData.category = category.trim();
    }

    if (year !== undefined) {
      if (!/^\d{4}$/.test(String(year))) {
        return res.status(400).json({
          success: false,
          message: "Please select a valid four-digit year",
        });
      }

      updateData.year = String(year);
    }

    const existingPhoto = await PhotoGallery.findById(req.params.id);

    if (!existingPhoto) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    if (req.file) {
      updateData.image = req.file.path;
      updateData.public_id = req.file.filename;
    }

    const photo = await PhotoGallery.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Delete the previous Cloudinary image after a successful update.
    if (req.file && existingPhoto.public_id) {
      try {
        await cloudinary.uploader.destroy(existingPhoto.public_id);
      } catch (cloudinaryError) {
        console.error("Old Cloudinary image cleanup failed:", cloudinaryError);
      }
    }

    res.status(200).json({
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

// Delete a photo
export const deletePhoto = async (req, res) => {
  try {
    const photo = await PhotoGallery.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    if (photo.public_id) {
      await cloudinary.uploader.destroy(photo.public_id);
    }

    await PhotoGallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
