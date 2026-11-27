
export const protectAdmin = (req, res, next) => {
  const admin = req.session?.admin;

  if (!admin?.id || admin.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please login.",
    });
  }

  next();
};
