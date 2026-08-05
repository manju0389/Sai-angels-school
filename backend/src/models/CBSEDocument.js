import mongoose from "mongoose";

// Schema for storing CBSE PDF documents
const CBSEDocumentSchema = new mongoose.Schema({
  // Title of the document
  title: {
    type: String,
    required: true,
  },

  // Unique slug used to fetch the document
  slug: {
    type: String,
    required: true,
    unique: true,
  },

  // URL/path where the PDF is stored
  pdf_url: {
    type: String,
    required: true,
  },

  // Storage provider's public ID (used for updates/deletion)
  public_id: {
    type: String,
  },
});

// Export the CBSEDocument model
export default mongoose.model(
  "CBSEDocument",
  CBSEDocumentSchema
);