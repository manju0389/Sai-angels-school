import mongoose, { Schema, models } from "mongoose";

export interface IBanner {
  image: string;
  publicId: string;
  order: number;
  isActive: boolean;
}

const BannerSchema = new Schema<IBanner>(
  {
    image: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner =
  models.Banner ||
  mongoose.model<IBanner>("Banner", BannerSchema);

export default Banner;
