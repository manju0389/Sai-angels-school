import Principal from "../models/Principal.js";
import cloudinary from "../config/cloudinary.js";

// Get all principals
export const getPrincipal = async (req, res) => {
  try {
    const principal = await Principal.find();
    res.json(principal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add principal with Cloudinary image upload
export const addPrincipal = async (req, res) => {
  try {
    const principal = new Principal({
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,

      // Store Cloudinary image details
      images: req.files.map(file => file.path),
      public_ids: req.files.map(file => file.filename),
    });

    await principal.save();

    res.status(201).json(principal);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update principal details and images
export const updatePrincipal = async (req, res) => {
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
    let existingImages = [];

if (req.body.existingImages) {
  existingImages = JSON.parse(req.body.existingImages);
}

if (req.files && req.files.length > 0) {
  updateData.images = [
    ...existingImages,
    ...req.files.map(file => file.path),
  ];

  updateData.public_ids = [
    ...req.files.map(file => file.filename),
  ];
} else {
  updateData.images = existingImages;
}

    const principal = await Principal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" }
    );

    res.json(principal);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete principal and remove images from Cloudinary
export const deletePrincipal = async (req, res) => {
  try {
    const principal = await Principal.findById(req.params.id);

    if (!principal) {
      return res.status(404).json({
        message: "Principal not found",
      });
    }

    // Delete images from Cloudinary
    if (principal.public_ids && principal.public_ids.length > 0) {
      for (const id of principal.public_ids) {
        await cloudinary.uploader.destroy(id);
      }
    }

    // Delete principal from MongoDB
    await Principal.findByIdAndDelete(req.params.id);

    res.json({
      message: "Principal deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};