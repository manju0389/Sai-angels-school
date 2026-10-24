
import mongoose from "mongoose";

// Define the video gallery schema
const VideoGallerySchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically create createdAt and updatedAt fields
    timestamps: true,
  }
);

// Reuse the model if it already exists
export default mongoose.models.VideoGallery ||
  mongoose.model("VideoGallery", VideoGallerySchema);
