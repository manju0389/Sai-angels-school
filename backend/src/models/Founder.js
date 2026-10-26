import mongoose from "mongoose";

// Schema for storing founder details
const founderSchema = new mongoose.Schema({
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
});

// Export Founder model
export default mongoose.model("Founder", founderSchema);