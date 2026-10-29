
import mongoose from "mongoose";

const photoGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      match: /^\d{4}$/,
    },
    image: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const PhotoGallery =
  mongoose.models.PhotoGallery ||
  mongoose.model("PhotoGallery", photoGallerySchema);

export default PhotoGallery;

