import express from "express";

import {
  getAdministrations,
  addAdministration,
  updateAdministration,
  deleteAdministration,
} from "../controllers/administrationController.js";

// Create Express router
const router = express.Router();

// Get all administration records
router.get("/", getAdministrations);

// Add new administration record
router.post("/", addAdministration);

// Update administration record by ID
router.put("/:id", updateAdministration);

// Delete administration record by ID
router.delete("/:id", deleteAdministration);

// Export router
export default router;