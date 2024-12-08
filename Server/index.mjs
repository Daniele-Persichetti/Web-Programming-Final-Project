import express from "express";
import cors from "cors";
import { userController } from "./controllers/users.js";
import { workoutController } from "./controllers/workouts.js";
import { friendController } from "./controllers/friends.js";
import authController from "./controllers/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import { getCurrentUser } from "./model/supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://web-programming-final-project-fitness-app.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  })
);

// Current user endpoint
app.get("/api/current-user", async (_req, res) => {
  try {
    const user = await getCurrentUser();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not logged in" });
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ error: "Error fetching current user" });
  }
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV });
});

// API Routes
app.use("/api/v1/auth", authController);
app.use("/api/v1/users", userController);
app.use("/api/v1/workouts", workoutController);
app.use("/api/v1/friends", friendController);

// Serve static files
app.use(express.static(path.join(__dirname, "../Client/dist")));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Allowed Origins:", allowedOrigins);
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Supabase URL exists:", !!process.env.SUPABASE_URL);
  console.log("Supabase Key exists:", !!process.env.SUPABASE_SECRET_KEY);
});
