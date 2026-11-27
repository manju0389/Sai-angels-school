
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password;

    if (!username || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin || admin.isActive !== true) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Regenerate session to prevent session fixation
    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    // Create admin session
    req.session.admin = {
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    };

    // Save session before sending response
    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      admin: req.session.admin,
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process login. Please try again.",
    });
  }
};


// CHECK ADMIN LOGIN
export const checkAdmin = (req, res) => {
  if (!req.session?.admin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  return res.status(200).json({
    success: true,
    admin: req.session.admin,
  });
};


// ADMIN LOGOUT
export const adminLogout = (req, res) => {
  if (!req.session) {
    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  }

  req.session.destroy((error) => {
    if (error) {
      console.error("Admin logout error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Logout failed.",
      });
    }

    res.clearCookie("sa_admin_session", {
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  });
};
