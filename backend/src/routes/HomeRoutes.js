import express from "express";
import multer from "multer";

import {
  getBanners,
  uploadBanners,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
} from "../controllers/HomeController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WebP images are allowed"));
    }
  },
});

router.get("/banners", getBanners);
router.post("/banners", upload.array("images", 10), uploadBanners);
router.put("/banners/:id", upload.single("image"), updateBanner);
router.delete("/banners/:id", deleteBanner);
router.patch("/banners/:id/status", toggleBannerStatus);

export default router;
