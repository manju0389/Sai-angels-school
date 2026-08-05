import mongoose from "mongoose";

const NewsMediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "School Program",
    },

    year: {
      type: String,
      default: "2025-2026",
    },

    image: {
      type: String,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const NewsMedia = mongoose.model("NewsMedia", NewsMediaSchema);

export default NewsMedia;