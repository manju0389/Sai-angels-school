import express from "express";
import upload from "../middleware/upload.js";

import {
  createAchievement,
  getAchievements,
  deleteAchievement,
  updateAchievement,
} from "../controllers/achievementController.js";

const router = express.Router();

// ======================================================
// File Upload Middleware
// Handles multiple image uploads and Multer errors
// ======================================================
const handleUploadMiddleware = (req, res, next) => {
  upload.array("images")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message:
          err.code === "LIMIT_FILE_SIZE"
            ? "File too large (max 5 MB)"
            : err.message,
      });
    }

    next();
  });
};

// ======================================================
// Achievement Routes
// ======================================================

// Get all achievements
router.get("/", getAchievements);

// Create new achievement
router.post("/", handleUploadMiddleware, createAchievement);

// Update achievement
router.put("/:id", handleUploadMiddleware, updateAchievement);

// Delete achievement
router.delete("/:id", deleteAchievement);

export default router;