import CBSEDocument from "../models/CBSEDocument.js";
import axios from "axios";

/**
 * @desc    Create a new document or update an existing one
 * @route   POST /
 * @access  Public/Protected (depends on middleware)
 */
export const createDocument = async (req, res) => {
  try {
    // Check if a document with the same slug already exists
    const existing = await CBSEDocument.findOne({
      slug: req.body.slug,
    });

    if (existing) {
      // Update existing document
      existing.title = req.body.title;
      existing.pdf_url = req.file.path;
      existing.public_id = req.file.filename;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "PDF updated successfully",
        data: existing,
      });
    }

    // Create a new document
    const document = await CBSEDocument.create({
      title: req.body.title,
      slug: req.body.slug,
      pdf_url: req.file.path,
      public_id: req.file.filename,
    });

    res.status(201).json({
      success: true,
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all documents
 * @route   GET /
 * @access  Public
 */
export const getDocuments = async (req, res) => {
  try {
    const documents = await CBSEDocument.find();

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete a document by ID
 * @route   DELETE /:id
 * @access  Public/Protected
 */
export const deleteDocument = async (req, res) => {
  try {
    const document = await CBSEDocument.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get a PDF document using its slug
 * @route   GET /pdf/:slug
 * @access  Public
 */
export const getPDFBySlug = async (req, res) => {
  try {
    const document = await CBSEDocument.findOne({
      slug: req.params.slug,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Stream/View a PDF in the browser
 * @route   GET /view/:id
 * @access  Public
 */
export const viewPDF = async (req, res) => {
  try {
    // Find the document by its ID
    const document = await CBSEDocument.findById(req.params.id);

    if (!document) {
      return res.status(404).send("PDF not found");
    }

    // Fetch the PDF from the stored URL
    const response = await fetch(document.pdf_url);

    if (!response.ok) {
      return res.status(400).send("Unable to fetch PDF");
    }

    // Convert the response into a buffer
    const buffer = await response.arrayBuffer();

    // Set response headers so the PDF opens in the browser
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      'inline; filename="document.pdf"'
    );

    // Send the PDF file
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};