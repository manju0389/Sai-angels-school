import express from "express";
import multer from "multer";

import {
  getBanners,
  uploadBanners,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
  getToppers,
  getActiveToppers,
  uploadTopper,
  updateTopper,
  deleteTopper,
  toggleTopperStatus,
} from "../controllers/HomeController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WebP images are allowed"));
    }
  },
});

// ==========================================
// BANNER ROUTES
// ==========================================

router.get("/banners", getBanners);
router.post("/banners", upload.array("images", 10), uploadBanners);
router.put("/banners/:id", upload.single("image"), updateBanner);
router.delete("/banners/:id", deleteBanner);
router.patch("/banners/:id/status", toggleBannerStatus);

// ==========================================
// TOPPER ROUTES
// ==========================================

// Public website - active toppers only
router.get("/toppers/active", getActiveToppers);

// Admin - all toppers
router.get("/toppers", getToppers);
router.post("/toppers", upload.single("poster"), uploadTopper);
router.put("/toppers/:id", upload.single("poster"), updateTopper);
router.delete("/toppers/:id", deleteTopper);
router.patch("/toppers/:id/status", toggleTopperStatus);

export default router;
