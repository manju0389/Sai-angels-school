
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

async function createAdmin() {
  try {
    const username = process.env.ADMIN_USERNAME?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const mongoUri = process.env.MONGO_URI;

    if (!username || !password || !mongoUri) {
      throw new Error("Missing required environment variables.");
    }

    await mongoose.connect(mongoUri);

    console.log("Connected database:", mongoose.connection.name);

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.findOneAndUpdate(
      { username },
      {
        $set: {
          username,
          password: hashedPassword,
          isActive: true,
          role: "admin",
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    const verified = await bcrypt.compare(
      password,
      admin.password
    );

    if (!verified) {
      throw new Error("Admin password verification failed.");
    }

    console.log("--------------------------------");
    console.log("ADMIN SETUP SUCCESSFUL");
    console.log("Username:", admin.username);
    console.log("Password verification: PASS");
    console.log("--------------------------------");

  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

createAdmin();
