import Founder from "../models/Founder.js";
import cloudinary from "../config/cloudinary.js";

// Get all founders
export const getFounders = async (req, res) => {
  try {
    const founders = await Founder.find();
    res.json(founders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add a new founder
export const addFounder = async (req, res) => {
  try {
    const founder = new Founder({
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,

      // Store uploaded image paths
      images: req.files.map(file => ({
      url: file.path,
      public_id: file.filename,
      })),
    });

    await founder.save();

    res.status(201).json(founder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update existing founder details
export const updateFounder = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const updateData = {
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
    };

    console.log("UPDATE DATA:", updateData);

    // Update images only if new files are uploaded
    if (req.files && req.files.length > 0) {
  // Get existing founder
  const existingFounder = await Founder.findById(req.params.id);

  // Delete old images from Cloudinary
  if (existingFounder?.images?.length) {
    for (const image of existingFounder.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }
console.log("Cloudinary Files:", req.files);
  // Save new images
  updateData.images = req.files.map(file => ({
    url: file.path,
    public_id: file.filename,
  }));
}

    const founder = await Founder.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(founder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a founder
export const deleteFounder = async (req, res) => {
  try {
    const founder = await Founder.findById(req.params.id);

    if (!founder) {
      return res.status(404).json({
        message: "Founder not found",
      });
    }

    // Delete images from Cloudinary
    if (founder.images?.length) {
      for (const image of founder.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    // Delete MongoDB document
    await Founder.findByIdAndDelete(req.params.id);

    res.json({
      message: "Founder deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};