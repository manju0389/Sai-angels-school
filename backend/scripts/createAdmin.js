
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../src/models/Admin.js";

async function main() {
  const {
    MONGODB_URI,
    ADMIN_NAME,
    ADMIN_USERNAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
  } = process.env;

  if (
    !MONGODB_URI ||
    !ADMIN_NAME ||
    !ADMIN_USERNAME ||
    !ADMIN_EMAIL ||
    !ADMIN_PASSWORD
  ) {
    throw new Error("Missing required environment variables.");
  }

  if (ADMIN_PASSWORD.length < 12) {
    throw new Error(
      "Use a unique admin password of at least 12 characters."
    );
  }

  await mongoose.connect(MONGODB_URI);

  try {
    const username = ADMIN_USERNAME.trim().toLowerCase();
    const email = ADMIN_EMAIL.trim().toLowerCase();

    const existing = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existing) {
      throw new Error(
        "An admin with this username or email already exists."
      );
    }

    const password = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await Admin.create({
      name: ADMIN_NAME.trim(),
      username,
      email,
      password,
      role: "admin",
    });

    console.log(`Admin account created for username: ${username}`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error("Admin creation failed:", error.message);
  process.exitCode = 1;
});
