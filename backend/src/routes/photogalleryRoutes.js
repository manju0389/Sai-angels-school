import express from "express";
import upload from "../middleware/upload.js";

import {
  getPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "../controllers/PhotoGalleryController.js";

const router = express.Router();

// Get all gallery images
router.get("/", getPhotos);

// Get a single gallery image
router.get("/:id", getPhoto);

// Upload image to Cloudinary gallery folder
router.post("/", upload.single("image"), createPhoto);

// Update gallery image
router.put("/:id", upload.single("image"), updatePhoto);

// Delete image from Cloudinary and MongoDB
router.delete("/:id", deletePhoto);

export default router;