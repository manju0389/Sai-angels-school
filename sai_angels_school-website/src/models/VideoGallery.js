import mongoose from "mongoose";

// Schema for storing video gallery details
const VideoGallerySchema = new mongoose.Schema(
  {
    // Year associated with the video
    year: {
      type: String,
      required: true,
    },

    // Title of the video
    title: {
      type: String,
      required: true,
    },

    // Video URL
    url: {
      type: String,
      required: true,
    },

    // Date of the video
    date: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export existing model if already created, otherwise create a new model
export default mongoose.models.VideoGallery ||
  mongoose.model("VideoGallery", VideoGallerySchema);