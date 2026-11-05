import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Banner from "@/models/Banner";

import mongoose from "mongoose";

const uploadToCloudinary = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "sai-angels-school/banners",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });
};

// GET ALL BANNERS
export async function getBanners() {
  await connectDB();

  return Banner.find().sort({ order: 1, createdAt: -1 }).lean();
}

// UPLOAD MULTIPLE BANNERS
export async function createBanners(files: File[]) {
  await connectDB();

  const createdBanners = [];

  for (const file of files) {
    const uploaded = await uploadToCloudinary(file);

    try {
      const banner = await Banner.create({
        image: uploaded.secure_url,
        publicId: uploaded.public_id,
        order: await Banner.countDocuments(),
        isActive: true,
      });

      createdBanners.push(banner);
    } catch (error) {
      await cloudinary.uploader.destroy(uploaded.public_id);
      throw error;
    }
  }

  return createdBanners;
}

// UPDATE BANNER IMAGE
export async function updateBanner(id: string, file: File) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid banner ID");
  }

  const banner = await Banner.findById(id);

  if (!banner) {
    throw new Error("Banner not found");
  }

  const uploaded = await uploadToCloudinary(file);

  const oldPublicId = banner.publicId;

  try {
    banner.image = uploaded.secure_url;
    banner.publicId = uploaded.public_id;

    await banner.save();
  } catch (error) {
    await cloudinary.uploader.destroy(uploaded.public_id);
    throw error;
  }

  if (oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId);
  }

  return banner;
}

// DELETE BANNER
export async function deleteBanner(id: string) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid banner ID");
  }

  const banner = await Banner.findById(id);

  if (!banner) {
    throw new Error("Banner not found");
  }

  await cloudinary.uploader.destroy(banner.publicId);
  await Banner.findByIdAndDelete(id);

  return { message: "Banner deleted successfully" };
}
