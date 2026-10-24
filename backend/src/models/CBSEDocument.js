
import mongoose from "mongoose";

const CBSEDocumentSchema = new mongoose.Schema({
  // Display title of the PDF document.
  title: {
    type: String,
    required: true,
    trim: true,
  },

  // Unique identifier used to retrieve a document for a page.
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  // Cloudinary URL used to view the PDF.
  pdf_url: {
    type: String,
    required: true,
  },

  // Cloudinary public ID used to delete or replace the PDF.
  public_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("CBSEDocument", CBSEDocumentSchema);
