
import express from "express";
import {
  getVideoGallery,
  createVideoGallery,
  updateVideoGallery,
  deleteVideoGallery,
} from "../controllers/VideoGalleryController.js";

// Create the video gallery router
const router = express.Router();

// GET: Fetch all videos
router.get("/", getVideoGallery);

// POST: Add a new video
router.post("/", createVideoGallery);

// PUT: Update a video by ID
router.put("/:id", updateVideoGallery);

// DELETE: Remove a video by ID
router.delete("/:id", deleteVideoGallery);

export default router;