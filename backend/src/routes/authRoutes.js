
import express from "express";
import {
  adminLogin,
  checkAdmin,
  adminLogout,
} from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Check admin authentication
router.get("/check", protectAdmin, checkAdmin);

// Admin logout
router.post("/logout", protectAdmin, adminLogout);

export default router;
