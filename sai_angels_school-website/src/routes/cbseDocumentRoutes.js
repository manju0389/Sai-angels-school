import express from "express";
import upload from "../middleware/upload.js";

import {
  createDocument,
  getDocuments,
  deleteDocument,
  getPDFBySlug,
  viewPDF,
} from "../controllers/cbseDocumentController.js";

// Create a new Express router instance
const router = express.Router();

router.get("/", getDocuments);
/**
 * @route   POST /
 * @desc    Upload a PDF and create a new document
 * @access  Public/Protected (depends on your middleware)
 */
router.post("/", upload.single("pdf"), createDocument);

/**
 * @route   GET /view/:id
 * @desc    View a PDF by its document ID
 * @access  Public
 */
router.get("/view/:id", viewPDF);

/**
 * @route   GET /pdf/:slug
 * @desc    Get PDF details using its slug
 * @access  Public
 */
router.get("/pdf/:slug", getPDFBySlug);

/**
 * @route   DELETE /:id
 * @desc    Delete a document by its ID
 * @access  Public/Protected (depends on your middleware)
 */
router.delete("/:id", deleteDocument);

// Export the router
export default router;