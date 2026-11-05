
import mongoose from "mongoose";

// ==========================================
// BANNER MODEL
// ==========================================

const HomeSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Home =
  mongoose.models.Home || mongoose.model("Home", HomeSchema);

// ==========================================
// TOPPER MODEL
// ==========================================

const TopperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: String,
      required: true,
      trim: true,
    },
    poster: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Topper =
  mongoose.models.Topper || mongoose.model("Topper", TopperSchema);

// ==========================================
// GALLERY MODEL
// ==========================================

const GallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery =
  mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);

export { Topper, Gallery };
export default Home;
