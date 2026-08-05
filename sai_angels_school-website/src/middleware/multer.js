import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;

  const isValid =
    allowed.test(file.mimetype) &&
    allowed.test(path.extname(file.originalname).toLowerCase());

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png and webp images are allowed"));
  }
};

export default multer({
  storage,
  fileFilter,
});