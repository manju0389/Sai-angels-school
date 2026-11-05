import Home, { Topper } from "../models/Home.js";
import cloudinary from "../config/cloudinary.js";

// Upload image buffer to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

// ==========================================
// BANNERS
// ==========================================

// GET ALL BANNERS
export const getBanners = async (req, res) => {
  try {
    const banners = await Home.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({ success: true, banners });
  } catch (error) {
    console.error("Get banners error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

// UPLOAD MULTIPLE BANNERS
export const uploadBanners = async (req, res) => {
  const uploadedBanners = [];

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select banner images",
      });
    }

    for (const file of req.files) {
      const result = await uploadToCloudinary(
        file.buffer,
        "sai-angels-school/banners"
      );

      try {
        const banner = await Home.create({
          image: result.secure_url,
          publicId: result.public_id,
          isActive: true,
          order: await Home.countDocuments(),
        });

        uploadedBanners.push(banner);
      } catch (dbError) {
        await cloudinary.uploader.destroy(result.public_id);
        throw dbError;
      }
    }

    res.status(201).json({
      success: true,
      message: "Banners uploaded successfully",
      banners: uploadedBanners,
    });
  } catch (error) {
    console.error("Upload banners error:", error);

    res.status(500).json({
      success: false,
      message: "Banner upload failed",
      uploadedCount: uploadedBanners.length,
    });
  }
};

// UPDATE / REPLACE BANNER IMAGE
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const banner = await Home.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "sai-angels-school/banners"
    );

    const oldPublicId = banner.publicId;

    try {
      banner.image = result.secure_url;
      banner.publicId = result.public_id;
      await banner.save();
    } catch (error) {
      await cloudinary.uploader.destroy(result.public_id);
      throw error;
    }

    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (error) {
        console.error("Old Cloudinary image cleanup failed:", error);
      }
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    console.error("Update banner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update banner",
    });
  }
};

// DELETE BANNER
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Home.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Delete Cloudinary image first
    if (banner.publicId) {
      const result = await cloudinary.uploader.destroy(banner.publicId);

      if (result.result !== "ok" && result.result !== "not found") {
        return res.status(502).json({
          success: false,
          message: "Cloudinary image could not be deleted. Banner was not removed from MongoDB.",
        });
      }
    }

    await Home.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Banner deleted from MongoDB and Cloudinary successfully",
    });
  } catch (error) {
    console.error("Delete banner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
    });
  }
};

// ACTIVATE / DEACTIVATE BANNER
export const toggleBannerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Home.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner status updated",
      banner,
    });
  } catch (error) {
    console.error("Toggle banner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update banner status",
    });
  }
};

// ==========================================
// TOPPERS
// ==========================================

// GET ALL TOPPERS - ADMIN
export const getToppers = async (req, res) => {
  try {
    const toppers = await Topper.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      toppers,
    });
  } catch (error) {
    console.error("Get toppers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch toppers",
    });
  }
};

// GET ACTIVE TOPPERS - PUBLIC WEBSITE
export const getActiveToppers = async (req, res) => {
  try {
    const toppers = await Topper.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      toppers,
    });
  } catch (error) {
    console.error("Get active toppers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch toppers",
    });
  }
};

// ADD TOPPER
export const uploadTopper = async (req, res) => {
  let uploadedImage = null;

  try {
    const { name, score } = req.body;

    if (!name?.trim() || !score?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student name and score are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a topper poster",
      });
    }

    uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "sai-angels-school/toppers"
    );

    const topper = await Topper.create({
      name: name.trim(),
      score: score.trim(),
      poster: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
      isActive: true,
      order: await Topper.countDocuments(),
    });

    res.status(201).json({
      success: true,
      message: "Topper added successfully",
      topper,
    });
  } catch (error) {
    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Topper upload cleanup failed:", cleanupError);
      }
    }

    console.error("Upload topper error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add topper",
    });
  }
};

// UPDATE TOPPER
export const updateTopper = async (req, res) => {
  let uploadedImage = null;

  try {
    const { id } = req.params;
    const { name, score } = req.body;

    const topper = await Topper.findById(id);

    if (!topper) {
      return res.status(404).json({
        success: false,
        message: "Topper not found",
      });
    }

    if (!name?.trim() || !score?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student name and score are required",
      });
    }

    const oldPublicId = topper.publicId;

    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "sai-angels-school/toppers"
      );

      topper.poster = uploadedImage.secure_url;
      topper.publicId = uploadedImage.public_id;
    }

    topper.name = name.trim();
    topper.score = score.trim();

    try {
      await topper.save();
    } catch (saveError) {
      if (uploadedImage?.public_id) {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      }

      throw saveError;
    }

    // Remove old poster only after the new record is saved
    if (uploadedImage && oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (cleanupError) {
        console.error("Old topper poster cleanup failed:", cleanupError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Topper updated successfully",
      topper,
    });
  } catch (error) {
    console.error("Update topper error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update topper",
    });
  }
};

// DELETE TOPPER
export const deleteTopper = async (req, res) => {
  try {
    const { id } = req.params;
    const topper = await Topper.findById(id);

    if (!topper) {
      return res.status(404).json({
        success: false,
        message: "Topper not found",
      });
    }

    // Delete Cloudinary image first
    if (topper.publicId) {
      const result = await cloudinary.uploader.destroy(topper.publicId);

      if (result.result !== "ok" && result.result !== "not found") {
        return res.status(502).json({
          success: false,
          message: "Cloudinary poster could not be deleted. Topper was not removed from MongoDB.",
        });
      }
    }

    await Topper.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Topper deleted from MongoDB and Cloudinary successfully",
    });
  } catch (error) {
    console.error("Delete topper error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete topper",
    });
  }
};

// ACTIVATE / DEACTIVATE TOPPER
export const toggleTopperStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const topper = await Topper.findById(id);

    if (!topper) {
      return res.status(404).json({
        success: false,
        message: "Topper not found",
      });
    }

    topper.isActive = !topper.isActive;
    await topper.save();

    res.status(200).json({
      success: true,
      message: "Topper status updated",
      topper,
    });
  } catch (error) {
    console.error("Toggle topper status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update topper status",
    });
  }
};
