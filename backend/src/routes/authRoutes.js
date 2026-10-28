
const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

// Login
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
      email.length > 254 ||
      password.length > 1024
    ) {
      return res.status(400).json({
        message: "Enter a valid email and password.",
      });
    }

    const admin = await Admin.findOne({ email }).select(
      "+password"
    );

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
        message: "Access denied.",
      });
    }

    // Prevent session fixation.
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({
          message: "Unable to create session.",
        });
      }

      req.session.adminId = admin._id.toString();

      req.session.save((saveErr) => {
        if (saveErr) {
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
      message: "Unable to log in. Please try again.",
    });
  }
});

// Check current session
router.get("/me", async (req, res) => {
  try {
    if (!req.session?.adminId) {
      return res.status(401).json({
        message: "Not authenticated.",
      });
    }

    const admin = await Admin.findById(
      req.session.adminId
    ).select("_id name email role");

    if (!admin || admin.role !== "admin") {
      return req.session.destroy(() => {
        res.status(401).json({
          message: "Session is no longer valid.",
        });
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

// Logout
router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.json({ message: "Logged out." });
  }

  req.session.destroy((err) => {
    if (err) {
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

module.exports = router;

