import Founder from "../models/Founder.js";
import cloudinary from "../config/cloudinary.js";

// Get all founders from MongoDB
export const getFounders = async (req, res) => {
  try {
    const founders = await Founder.find();
    res.json(founders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new founder to MongoDB
export const addFounder = async (req, res) => {
  try {
    const founder = new Founder({
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,

      // Store uploaded image URLs and Cloudinary public IDs
      images: (req.files || []).map((file) => ({
        url: file.path,
        public_id: file.filename,
      })),
    });

    await founder.save();

    res.status(201).json({
      message: "Founder saved to MongoDB successfully",
      founder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing founder
export const updateFounder = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
    };

    // Replace existing images only when new images are uploaded
    if (req.files && req.files.length > 0) {
      const existingFounder = await Founder.findById(req.params.id);

      if (!existingFounder) {
        return res.status(404).json({
          message: "Founder not found",
        });
      }

      // Delete old images from Cloudinary
      for (const image of existingFounder.images || []) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Save the newly uploaded images
      updateData.images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    const founder = await Founder.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!founder) {
      return res.status(404).json({
        message: "Founder not found",
      });
    }

    res.json({
      message: "Founder updated successfully",
      founder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a founder from MongoDB and remove its Cloudinary images
export const deleteFounder = async (req, res) => {
  try {
    // Find the founder before attempting deletion
    const founder = await Founder.findById(req.params.id);

    if (!founder) {
      return res.status(404).json({
        message: "Founder not found in MongoDB",
      });
    }

    // Delete the MongoDB document first
    await Founder.findByIdAndDelete(req.params.id);

    // Remove associated images from Cloudinary
    // A Cloudinary error should not undo the MongoDB deletion
    const imageCleanupErrors = [];

    for (const image of founder.images || []) {
      try {
        await cloudinary.uploader.destroy(image.public_id);
      } catch (error) {
        imageCleanupErrors.push(image.public_id);
        console.error("Cloudinary image cleanup failed:", error.message);
      }
    }

    // Report the result to the frontend
    res.json({
      message: "Founder record deleted from MongoDB successfully",
      imagesCleanupPending: imageCleanupErrors.length > 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
