
import express from "express";
import {
  adminLogin,
  checkAdmin,
  adminLogout,
} from "../controllers/authController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/check", protectAdmin, checkAdmin);

// Allow logout even if the session has expired
router.post("/logout", adminLogout);

export default router;
