
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
      throw new Error("Required environment variables are missing.");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected:", mongoose.connection.name);

    const existingAdmin = await Admin.findOne({ username });

    const hashedPassword = await bcrypt.hash(password, 12);

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "admin";
      existingAdmin.isActive = true;

      await existingAdmin.save();

      console.log("Existing admin account updated successfully.");
    } else {
      await Admin.create({
        username,
        password: hashedPassword,
        role: "admin",
        isActive: true,
      });

      console.log("New admin account created successfully.");
    }

    console.log("--------------------------------");
    console.log("ADMIN SETUP COMPLETED");
    console.log("Username:", username);
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
