import express from "express";
import upload from "../middleware/upload.js";

import {
  getFounders,
  addFounder,
  updateFounder,
  deleteFounder,
} from "../controllers/founderController.js";

// Create Express router
const router = express.Router();

// Get all founders
router.get("/", getFounders);

// Add a new founder with image upload support
router.post("/", upload.array("images", 10), addFounder);

// Update founder details with image upload support
router.put("/:id", upload.array("images", 10), updateFounder);

// Delete a founder by ID
router.delete("/:id", deleteFounder);

// Export router
export default router;