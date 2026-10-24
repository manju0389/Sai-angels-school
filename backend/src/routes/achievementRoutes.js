
import express from "express";
import upload from "../middleware/upload.js";

import {
  createAchievement,
  getAchievements,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

const router = express.Router();

// Handle multiple image uploads and Multer errors.
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

// Get all achievements.
router.get("/", getAchievements);

// Create an achievement with multiple images.
router.post("/", handleUploadMiddleware, createAchievement);

// Update an achievement and optionally replace its images.
router.put("/:id", handleUploadMiddleware, updateAchievement);

// Delete an achievement and its Cloudinary images.
router.delete("/:id", deleteAchievement);

export default router;
