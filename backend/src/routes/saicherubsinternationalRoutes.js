import express from "express";
import upload from "../middleware/upload.js";

import {
  getAllSaiCherubs,
  createSaiCherubs,
  updateSaiCherubs,
  deleteSaiCherubs,
} from "../controllers/saiCherubsInternationalController.js";

// Initialize Express router
const router = express.Router();

// Fetch all Sai Cherubs International records
router.get("/", getAllSaiCherubs);

// Create a new Sai Cherubs International record with image uploads
router.post("/", upload.array("images", 10), createSaiCherubs);

// Update an existing Sai Cherubs International record with image uploads
router.put("/:id", upload.array("images", 10), updateSaiCherubs);

// Delete a Sai Cherubs International record
router.delete("/:id", deleteSaiCherubs);

// Export router
export default router;