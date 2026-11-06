import Home, { Topper, Gallery, News, Testimonial } from "../models/Home.js";
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
// GET ALL TESTIMONIALS
// ==========================================

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ACTIVE TESTIMONIALS
export const getActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD TESTIMONIAL
export const addTestimonial = async (req, res) => {
  try {
    const {
      name,
      role,
      message,
      initials,
      color,
      rating,
    } = req.body;

    if (!name?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required",
      });
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      role: role || "Parent Testimonial",
      message: message.trim(),
      initials: initials || name.charAt(0).toUpperCase(),
      color: color || "bg-purple-100 text-purple-700",
      rating: Number(rating ?? 5),
      isActive: true,
      order: await Testimonial.countDocuments(),
    });

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Add testimonial error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TESTIMONIAL
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        role: req.body.role,
        message: req.body.message,
        initials: req.body.initials,
        color: req.body.color,
        rating: Number(req.body.rating ?? 5),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Update testimonial error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TESTIMONIAL
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ACTIVATE / DEACTIVATE TESTIMONIAL
export const toggleTestimonialStatus = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.isActive = !testimonial.isActive;

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial status updated",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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


// ==========================================
// GET ALL NEWS - ADMIN
// ==========================================

export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({
      order: 1,
      date: -1,
    });

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ACTIVE NEWS - PUBLIC
export const getActiveNews = async (req, res) => {
  try {
    const news = await News.find({
      isActive: true,
    }).sort({
      order: 1,
      date: -1,
    });

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD NEWS
export const addNews = async (req, res) => {
  try {
    const {
      date,
      category,
      title,
      description,
      link,
    } = req.body;

    if (!date || !category || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const count = await News.countDocuments();

    const news = await News.create({
      date,
      category,
      title,
      description,
      link: link || "",
      isActive: true,
      order: count,
    });

    res.status(201).json({
      success: true,
      message: "News added successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE NEWS
export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    const {
      date,
      category,
      title,
      description,
      link,
      order,
    } = req.body;

    if (date !== undefined) news.date = date;
    if (category !== undefined) news.category = category;
    if (title !== undefined) news.title = title;
    if (description !== undefined) news.description = description;
    if (link !== undefined) news.link = link;
    if (order !== undefined) news.order = Number(order);

    await news.save();

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE NEWS
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ACTIVATE / DEACTIVATE NEWS
export const toggleNewsStatus = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    news.isActive = !news.isActive;
    await news.save();

    res.status(200).json({
      success: true,
      message: "News status updated successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// GALLERY
// ==========================================

// GET ALL GALLERY IMAGES - ADMIN
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      gallery,
      total: gallery.length,
      limit: 10,
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
    });
  }
};

// GET ACTIVE GALLERY IMAGES - PUBLIC WEBSITE
export const getActiveGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error("Get active gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
    });
  }
};

// ADD GALLERY IMAGE
export const uploadGalleryImage = async (req, res) => {
  let uploadedImage = null;

  try {
    const { alt } = req.body;

    if (!alt?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image description is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a gallery image",
      });
    }

    // Maximum 10 images, including inactive images
    const totalImages = await Gallery.countDocuments();

    if (totalImages >= 10) {
      return res.status(400).json({
        success: false,
        message: "Gallery limit reached. Maximum 10 images are allowed. Delete an existing image to upload another.",
        total: totalImages,
        limit: 10,
      });
    }

    uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "sai-angels-school/gallery"
    );

    const galleryImage = await Gallery.create({
      image: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
      alt: alt.trim(),
      isActive: true,
      order: totalImages,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully",
      galleryImage,
    });
  } catch (error) {
    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Gallery upload cleanup failed:", cleanupError);
      }
    }

    console.error("Upload gallery image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload gallery image",
    });
  }
};

// UPDATE GALLERY IMAGE
export const updateGalleryImage = async (req, res) => {
  let uploadedImage = null;

  try {
    const { id } = req.params;
    const { alt } = req.body;

    const galleryImage = await Gallery.findById(id);

    if (!galleryImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    if (alt !== undefined && !alt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image description cannot be empty",
      });
    }

    const oldPublicId = galleryImage.publicId;

    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "sai-angels-school/gallery"
      );

      galleryImage.image = uploadedImage.secure_url;
      galleryImage.publicId = uploadedImage.public_id;
    }

    if (alt !== undefined) {
      galleryImage.alt = alt.trim();
    }

    try {
      await galleryImage.save();
    } catch (saveError) {
      if (uploadedImage?.public_id) {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      }

      throw saveError;
    }

    // Delete old image only after successful update
    if (uploadedImage && oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (cleanupError) {
        console.error("Old gallery image cleanup failed:", cleanupError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Gallery image updated successfully",
      galleryImage,
    });
  } catch (error) {
    console.error("Update gallery image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update gallery image",
    });
  }
};

// DELETE GALLERY IMAGE
export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const galleryImage = await Gallery.findById(id);

    if (!galleryImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Delete Cloudinary image first
    if (galleryImage.publicId) {
      const result = await cloudinary.uploader.destroy(
        galleryImage.publicId
      );

      if (
        result.result !== "ok" &&
        result.result !== "not found"
      ) {
        return res.status(502).json({
          success: false,
          message: "Cloudinary image could not be deleted. Gallery image was not removed from MongoDB.",
        });
      }
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete gallery image",
    });
  }
};

// ACTIVATE / DEACTIVATE GALLERY IMAGE
export const toggleGalleryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const galleryImage = await Gallery.findById(id);

    if (!galleryImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    galleryImage.isActive = !galleryImage.isActive;

    await galleryImage.save();

    res.status(200).json({
      success: true,
      message: "Gallery image status updated",
      galleryImage,
    });
  } catch (error) {
    console.error("Toggle gallery status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update gallery image status",
    });
  }
};

