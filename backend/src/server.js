import "dotenv/config";

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import achievementRoutes from "./routes/achievementRoutes.js";
import workinghoursRoutes from "./routes/workinghoursRoutes.js";
import videogalleryRoutes from "./routes/videogalleryRoutes.js";
import founderRoutes from "./routes/founderRoutes.js";
import principalRoutes from "./routes/principalRoutes.js";
import saicherubsinternationalRoutes from "./routes/saicherubsinternationalRoutes.js";
import administrationRoutes from "./routes/administrationRoutes.js";
import photogalleryRoutes from "./routes/photogalleryRoutes.js";
import newsmediaRoutes from "./routes/newsmediaRoutes.js";
import cbseDocumentRoutes from "./routes/cbseDocumentRoutes.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Connect DB
connectDB();

// Routes
app.use("/api/achievements", achievementRoutes);
app.use("/api/admission/working-hours", workinghoursRoutes);
app.use("/api/gallery/video-gallery", videogalleryRoutes);
app.use("/api/about-us/our-founder", founderRoutes);
app.use("/api/about-us/principal-speaks", principalRoutes);
app.use("/api/activities/sai-cherubs-international", saicherubsinternationalRoutes);
app.use("/api/about-us/administration", administrationRoutes);
app.use("/api/admin/PhotoGallery", photogalleryRoutes);
app.use("/api/news-media", newsmediaRoutes);
app.use(
 "/api/cbse-documents",
 cbseDocumentRoutes
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});