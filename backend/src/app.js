
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

// Required when running behind Render's proxy
app.set("trust proxy", 1);

// Allow your deployed Next.js frontend
app.use(
  cors({
    origin: "https://sai-angels-school-frontend.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "20kb" }));

// Required environment variables
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing from backend environment variables");
}

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing from backend environment variables");
}

// Secure session configuration
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

app.get("/", (req, res) => {
  res.json({ message: "Backend Running" });
});

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));

// IMPORTANT:
// Keep all your existing school-management routes registered.
// If they are already registered in server.js, do not duplicate them here.

module.exports = app;
