import mongoose from "mongoose";

// ======================================================
// Achievement Schema
// ======================================================
const achievementSchema = new mongoose.Schema(
  {
    // Achievement year
    year: {
      type: String,
      required: true,
    },

    // Store Cloudinary image details
    images: [
      {
        // Cloudinary image URL
        url: {
          type: String,
          required: true,
        },

        // Required to delete image from Cloudinary
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

export default mongoose.model("Achievement", achievementSchema);