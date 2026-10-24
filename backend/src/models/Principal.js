import mongoose from "mongoose";

const principalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  // Stores Cloudinary image URLs
  images: [
    {
      type: String,
    },
  ],

  // Stores Cloudinary public IDs for deleting images
  public_ids: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Principal", principalSchema);