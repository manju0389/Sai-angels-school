
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", adminSchema);

export default Admin;
