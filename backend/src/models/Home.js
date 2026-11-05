
import mongoose from "mongoose";

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

export default Home;
