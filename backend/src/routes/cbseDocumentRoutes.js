
import express from "express";
import upload from "../middleware/upload.js";

import {
  createDocument,
  getDocuments,
  deleteDocument,
  getPDFBySlug,
  viewPDF,
} from "../controllers/cbseDocumentController.js";

const router = express.Router();

// Get all uploaded PDF documents.
router.get("/", getDocuments);

// Upload a PDF or replace an existing document.
router.post("/", upload.single("pdf"), createDocument);

// View a PDF in the browser by its MongoDB document ID.
router.get("/view/:id", viewPDF);

// Get PDF details using the page slug.
router.get("/pdf/:slug", getPDFBySlug);

// Delete the Cloudinary file and MongoDB record.
router.delete("/:id", deleteDocument);

export default router;
