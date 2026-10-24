import mongoose from "mongoose";

// Administration schema definition
const administrationSchema = new mongoose.Schema(
  {
    // Facility / feature name
    facility: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export Administration model
export default mongoose.model(
  "Administration",
  administrationSchema
);