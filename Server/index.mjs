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
const user = getCurrentUser();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://web-programming-final-project-fitness-app.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(null, false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "../Client/dist")));

// API Routes
app.use("/api/v1/auth", authController);
app.use("/api/v1/users", userController);
app.use("/api/v1/workouts", workoutController);
app.use("/api/v1/friends", friendController);

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
