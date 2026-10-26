import CBSEDocument from "../models/cbseDocument.js";
import cloudinary from "../config/cloudinary.js";

// Delete a PDF from Cloudinary using its stored public ID.
async function deleteCloudinaryPDF(publicId) {
  if (!publicId) {
    throw new Error(
      "Cloudinary public ID is missing. The PDF was not deleted."
    );
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
    invalidate: true,
  });

  // Stop MongoDB deletion if Cloudinary deletion fails.
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error("Failed to delete the PDF from Cloudinary.");
  }

  return result;
}

// Create a document or replace an existing document with the same slug.
export const createDocument = async (req, res) => {
  let uploadedPublicId = req.file?.filename;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file.",
      });
    }

    const { title, slug } = req.body;

    if (!title || !slug) {
      // Remove the newly uploaded file if the form data is invalid.
      await deleteCloudinaryPDF(uploadedPublicId);
      return res.status(400).json({
        success: false,
        message: "Title and slug are required.",
      });
    }

    const existing = await CBSEDocument.findOne({ slug });

    if (existing) {
      const oldPublicId = existing.public_id;

      // Save the new PDF details before removing the old PDF.
      existing.title = title;
      existing.pdf_url = req.file.path;
      existing.public_id = uploadedPublicId;
      await existing.save();

      // Delete the old Cloudinary file after the replacement is saved.
      if (oldPublicId && oldPublicId !== uploadedPublicId) {
        try {
          await deleteCloudinaryPDF(oldPublicId);
        } catch (error) {
          console.error("Old PDF cleanup failed:", error);
          return res.status(200).json({
            success: true,
            message:
              "PDF updated, but the previous Cloudinary file needs cleanup.",
            data: existing,
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "PDF updated successfully.",
        data: existing,
      });
    }

    const document = await CBSEDocument.create({
      title,
      slug,
      pdf_url: req.file.path,
      public_id: uploadedPublicId,
    });

    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully.",
      data: document,
    });
  } catch (error) {
    console.error("Document upload error:", error);

    // Clean up the newly uploaded file if saving failed.
    if (uploadedPublicId) {
      try {
        await deleteCloudinaryPDF(uploadedPublicId);
      } catch (cleanupError) {
        console.error("Uploaded PDF cleanup failed:", cleanupError);
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to save the PDF.",
    });
  }
};

// Return all PDF documents.
// Return all PDF documents.
export const getDocuments = async (req, res) => {
  try {
    console.log("CBSEDocument model:", typeof CBSEDocument);

    const documents = await CBSEDocument.find();

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Get CBSE documents error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch CBSE documents.",
    });
  }
};

// Fetch a PDF document using its slug.
export const getPDFBySlug = async (req, res) => {
  try {
    const document = await CBSEDocument.findOne({
      slug: req.params.slug,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "PDF not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Stream a PDF in the browser instead of downloading it directly.
export const viewPDF = async (req, res) => {
  try {
    const document = await CBSEDocument.findById(req.params.id);

    if (!document) {
      return res.status(404).send("PDF not found.");
    }

    const response = await fetch(document.pdf_url);

    if (!response.ok) {
      return res.status(400).send("Unable to fetch PDF.");
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="document.pdf"'
    );

    return res.send(buffer);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete the Cloudinary PDF first, then delete its MongoDB record.
export const deleteDocument = async (req, res) => {
  try {
    const document = await CBSEDocument.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    if (!document.public_id) {
      return res.status(409).json({
        success: false,
        message:
          "Cloudinary public ID is missing. Update the document before deleting it.",
      });
    }

    // Remove the file from Cloudinary before deleting its database record.
    await deleteCloudinaryPDF(document.public_id);

    await CBSEDocument.findByIdAndDelete(document._id);

    return res.status(200).json({
      success: true,
      message: "PDF deleted from Cloudinary and MongoDB successfully.",
    });
  } catch (error) {
    console.error("Document deletion error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to delete the PDF. Please try again.",
    });
  }
};