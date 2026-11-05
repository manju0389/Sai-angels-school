
import Home from "../models/Home.js";
import cloudinary from "../config/cloudinary.js";

// Upload image buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "sai-angels-school/banners",
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

// GET ALL BANNERS
export const getBanners = async (req, res) => {
  try {
    const banners = await Home.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      banners,
    });
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
      const result = await uploadToCloudinary(file.buffer);

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

    const result = await uploadToCloudinary(req.file.buffer);
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

    await Home.findByIdAndDelete(id);

    if (banner.publicId) {
      try {
        await cloudinary.uploader.destroy(banner.publicId);
      } catch (error) {
        console.error("Cloudinary deletion failed:", error);
      }
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
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
