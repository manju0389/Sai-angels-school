
import "dotenv/config";

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import { fileURLToPath } from "url";

// Existing school API routes
import achievementRoutes from "./routes/achievementRoutes.js";
import workinghoursRoutes from "./routes/workinghoursRoutes.js";
import videogalleryRoutes from "./routes/videogalleryRoutes.js";
import founderRoutes from "./routes/founderRoutes.js";
import principalRoutes from "./routes/principalRoutes.js";
import administrationRoutes from "./routes/administrationRoutes.js";
import photogalleryRoutes from "./routes/photogalleryRoutes.js";
import cbseDocumentRoutes from "./routes/cbseDocumentRoutes.js";

// Authentication route
import authRoutes from "./routes/authRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Render runs the application behind a proxy
app.set("trust proxy", 1);

// Required environment variables
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing");
}

// CORS configuration
app.use(
  cors({
    origin: "https://sai-angels-school-frontend.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON request bodies
app.use(express.json({ limit: "20kb" }));

// Store sessions in MongoDB
app.use(
  session({
    name: "sa_admin_session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
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

// Authentication APIs
app.use("/api/auth", authRoutes);

// Existing school APIs
app.use("/api/achievements", achievementRoutes);

app.use(
  "/api/admission/working-hours",
  workinghoursRoutes
);

app.use(
  "/api/gallery/video-gallery",
  videogalleryRoutes
);

app.use(
  "/api/about-us/our-founder",
  founderRoutes
);

app.use(
  "/api/about-us/principal-speaks",
  principalRoutes
);

app.use(
  "/api/about-us/administration",
  administrationRoutes
);

app.use(
  "/api/admin/PhotoGallery",
  photogalleryRoutes
);

app.use(
  "/api/cbse-documents",
  cbseDocumentRoutes
);

// Backend health check
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Start server only after MongoDB connects
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
