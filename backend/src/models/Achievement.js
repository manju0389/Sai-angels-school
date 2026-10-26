
import mongoose from "mongoose";

// Achievement schema.
const achievementSchema = new mongoose.Schema(
  {
    // Achievement year.
    year: {
      type: String,
      required: true,
    },

    // Store Cloudinary image URLs and public IDs.
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    // Automatically generate createdAt and updatedAt.
    timestamps: true,
  }
);

export default mongoose.model(
  "Achievement",
  achievementSchema
);
