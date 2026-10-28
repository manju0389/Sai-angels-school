
import "dotenv/config";

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import { fileURLToPath } from "url";

import achievementRoutes from "./routes/achievementRoutes.js";
import workinghoursRoutes from "./routes/workinghoursRoutes.js";
import videogalleryRoutes from "./routes/videogalleryRoutes.js";
import founderRoutes from "./routes/founderRoutes.js";
import principalRoutes from "./routes/principalRoutes.js";
import administrationRoutes from "./routes/administrationRoutes.js";
import photogalleryRoutes from "./routes/photogalleryRoutes.js";
import cbseDocumentRoutes from "./routes/cbseDocumentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("trust proxy", 1);

if (!process.env.MONGO_URI || !process.env.SESSION_SECRET) {
  throw new Error("MONGO_URI and SESSION_SECRET must be configured");
}

// Middlewares
app.use(
  cors({
    origin: "https://sai-angels-school-frontend.onrender.com",
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));

// Session storage in MongoDB
app.use(
  session({
    name: "sa_admin_session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "admin_sessions",
      ttl: 60 * 60 * 8,
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 8,
      path: "/",
    },
  })
);

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Connect DB
connectDB();

// Authentication
app.use("/api/auth", authRoutes);

// Existing school APIs — keep these
app.use("/api/achievements", achievementRoutes);
app.use("/api/admission/working-hours", workinghoursRoutes);
app.use("/api/gallery/video-gallery", videogalleryRoutes);
app.use("/api/about-us/our-founder", founderRoutes);
app.use("/api/about-us/principal-speaks", principalRoutes);
app.use("/api/about-us/administration", administrationRoutes);
app.use("/api/admin/PhotoGallery", photogalleryRoutes);
app.use("/api/cbse-documents", cbseDocumentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
