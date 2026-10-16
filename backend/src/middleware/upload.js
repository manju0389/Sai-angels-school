
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";

    // Use a fixed folder for achievements uploads.
    // This avoids relying on multipart field order.
    const folderName =
      req.originalUrl.includes("/api/achievements")
        ? "Achievements"
        : (req.body?.folder || "Others");

    return {
      folder: `School/${folderName}`,
      resource_type: isPdf ? "raw" : "image",
      public_id: `${Date.now()}-${path
        .parse(file.originalname)
        .name.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, PNG, WEBP images and PDF files are allowed"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
