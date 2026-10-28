
import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

    const password = req.body?.password;

    if (
      !email ||
      typeof password !== "string" ||
      !password ||
      password.length > 1024
    ) {
      return res.status(400).json({
        message: "Enter a valid email and password.",
      });
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (
      !admin ||
      !(await bcrypt.compare(password, admin.password))
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({
          message: "Unable to create session.",
        });
      }

      req.session.adminId = admin._id.toString();

      req.session.save((saveError) => {
        if (saveError) {
          return res.status(500).json({
            message: "Unable to save session.",
          });
        }

        return res.json({
          message: "Login successful.",
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Unable to log in.",
    });
  }
});

router.get("/me", async (req, res) => {
  try {
    if (!req.session?.adminId) {
      return res.status(401).json({
        message: "Not authenticated.",
      });
    }

    const admin = await Admin.findById(req.session.adminId)
      .select("_id name email role");

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({
        message: "Admin session is invalid.",
      });
    }

    return res.json({ admin });
  } catch (error) {
    console.error("Session check error:", error.message);
    return res.status(500).json({
      message: "Unable to verify session.",
    });
  }
});

router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.json({ message: "Logged out." });
  }

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "Unable to log out.",
      });
    }

    res.clearCookie("sa_admin_session", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.json({ message: "Logged out." });
  });
});

export default router;
