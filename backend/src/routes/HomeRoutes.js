import { NextRequest, NextResponse } from "next/server";
import {
  getBanners,
  createBanners,
} from "@/controllers/bannerController";

export const runtime = "nodejs";

export async function GET() {
  try {
    const banners = await getBanners();

    return NextResponse.json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error("Fetch banners error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const files = formData.getAll("images");

    const validFiles = files.filter(
      (item): item is File =>
        item instanceof File &&
        item.type.startsWith("image/") &&
        item.size > 0 &&
        item.size <= 10 * 1024 * 1024
    );

    if (validFiles.length === 0 || validFiles.length !== files.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Select valid images under 10 MB each",
        },
        { status: 400 }
      );
    }

    if (validFiles.length > 10) {
      return NextResponse.json(
        { success: false, message: "Maximum 10 images per upload" },
        { status: 400 }
      );
    }

    const banners = await createBanners(validFiles);

    return NextResponse.json(
      {
        success: true,
        message: "Banners uploaded successfully",
        banners,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Banner upload error:", error);

    return NextResponse.json(
      { success: false, message: "Banner upload failed" },
      { status: 500 }
    );
  }
}
