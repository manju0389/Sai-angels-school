
import express from "express";
import upload from "../middleware/upload.js";

import {
  getPhotoGallery,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "../controllers/PhotoGalleryController.js";

const router = express.Router();

// Get all gallery images, sorted by year
router.get("/", getPhotoGallery);

// Get a single gallery image
router.get("/:id", getPhoto);

// Upload an image with title, category, and year
router.post("/", upload.single("image"), createPhoto);

// Update title, category, year, and optionally the image
router.put("/:id", upload.single("image"), updatePhoto);

// Delete image from Cloudinary and MongoDB
router.delete("/:id", deletePhoto);

export default router;
