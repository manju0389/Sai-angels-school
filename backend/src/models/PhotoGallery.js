
import mongoose from "mongoose";

const photoGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 2100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
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
