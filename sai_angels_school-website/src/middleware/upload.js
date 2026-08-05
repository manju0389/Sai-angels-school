import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: `School/${req.body.folder || "Others"}`,

      // PDF -> raw, Images -> image
      resource_type: isPdf ? "raw" : "image",

      // Remove extension from filename
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "pdf",
      ],
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
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});
export default upload;