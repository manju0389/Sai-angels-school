
import mongoose from "mongoose";

// ==========================================
// Testimonial MODEL
// ==========================================
const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "Parent Testimonial",
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    initials: {
      type: String,
      default: "P",
      trim: true,
    },
    color: {
      type: String,
      default: "bg-purple-100 text-purple-700",
    },
    rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
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
  { timestamps: true }
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);

// ==========================================
// RECENT NEWS MODEL
// ==========================================
const NewsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      default: "",
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
  { timestamps: true }
);

const News =
  mongoose.models.News ||
  mongoose.model("News", NewsSchema);

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

export { Topper, Gallery, News, Testimonial };
export default Home;
