import express from "express";
import upload from "../middleware/upload.js";

import {
  getPrincipal,
  addPrincipal,
  updatePrincipal,
  deletePrincipal,
} from "../controllers/principalController.js";

const router = express.Router();

// Get all principals
router.get("/", getPrincipal);

// Add principal with multiple image uploads
router.post(
  "/",
  upload.array("images", 10),
  addPrincipal
);

// Update principal details and images
router.put(
  "/:id",
  upload.array("images", 10),
  updatePrincipal
);

// Delete principal and remove images from Cloudinary
router.delete(
  "/:id",
  deletePrincipal
);

export default router;