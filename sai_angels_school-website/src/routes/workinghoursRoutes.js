import express from "express";

import {
  getWorkingHours,
  saveWorkingHours,
} from "../controllers/workingHoursController.js";

const router = express.Router();

// Get working hours
router.get("/", getWorkingHours);

// Save working hours
router.post("/", saveWorkingHours);

export default router;