import express from "express";

import {
  getVideoGallery,
  createVideoGallery,
  updateVideoGallery,
  deleteVideoGallery,
} from "../controllers/VideoGalleryController.js";

// Create Express router instance
const router = express.Router();

// Get all video gallery items
router.get("/", getVideoGallery);

// Create a new video gallery item
router.post("/", createVideoGallery);

// Update an existing video gallery item by ID
router.put("/:id", updateVideoGallery);

// Delete a video gallery item by ID
router.delete("/:id", deleteVideoGallery);

// Export router
export default router;