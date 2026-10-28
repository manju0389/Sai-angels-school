
const Admin = require("../models/Admin");

async function requireAdmin(req, res, next) {
  try {
    if (!req.session?.adminId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const admin = await Admin.findById(
      req.session.adminId
    ).select("_id role");

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Admin authorization error:", error.message);
    res.status(500).json({
      message: "Unable to verify authorization.",
    });
  }
}

module.exports = requireAdmin;

