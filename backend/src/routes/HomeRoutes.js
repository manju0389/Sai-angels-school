
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
  getGallery,
  getActiveGallery,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  toggleGalleryStatus,
  getNews,
  getActiveNews,
  addNews,
  updateNews,
  deleteNews,
  toggleNewsStatus,
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

router.get("/toppers/active", getActiveToppers);
router.get("/toppers", getToppers);
router.post("/toppers", upload.single("poster"), uploadTopper);
router.put("/toppers/:id", upload.single("poster"), updateTopper);
router.delete("/toppers/:id", deleteTopper);
router.patch("/toppers/:id/status", toggleTopperStatus);

// ==========================================
// RECENT NEWS ROUTES
// ==========================================
router.get("/news/active", getActiveNews);
router.get("/news", getNews);
router.post("/news", addNews);
router.put("/news/:id", updateNews);
router.delete("/news/:id", deleteNews);
router.patch("/news/:id/status", toggleNewsStatus);

// ==========================================
// GALLERY ROUTES
// ==========================================

// Public website - active gallery images only
router.get("/gallery/active", getActiveGallery);

// Admin - all gallery images
router.get("/gallery", getGallery);
router.post("/gallery", upload.single("image"), uploadGalleryImage);
router.put("/gallery/:id", upload.single("image"), updateGalleryImage);
router.delete("/gallery/:id", deleteGalleryImage);
router.patch("/gallery/:id/status", toggleGalleryStatus);

export default router;
