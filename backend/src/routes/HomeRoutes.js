const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// GET ALL BANNERS
router.get("/banners", HomeController.getBanners);

// UPLOAD MULTIPLE BANNERS
router.post(
  "/banners",
  upload.array("images", 10),
  HomeController.uploadBanners
);

// REPLACE BANNER IMAGE
router.put(
  "/banners/:id",
  upload.single("image"),
  HomeController.updateBanner
);

// DELETE BANNER
router.delete("/banners/:id", HomeController.deleteBanner);

// ACTIVATE / DEACTIVATE
router.patch(
  "/banners/:id/status",
  HomeController.toggleBannerStatus
);

module.exports = router;
