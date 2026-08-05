import mongoose from "mongoose";

// Schema for Sai Cherubs International events
const SaiCherubsInternationalSchema = new mongoose.Schema(
  {
    // Event title
    title: {
      type: String,
      required: true,
    },

    // Event date
    date: {
      type: Date,
      required: true,
    },

    // Array of event images with Cloudinary details
    images: [
      {
        // Image URL
        url: {
          type: String,
          required: true,
        },

        // Cloudinary public ID
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export Sai Cherubs International model
export default mongoose.model("SaiCherubsInternational", SaiCherubsInternationalSchema);