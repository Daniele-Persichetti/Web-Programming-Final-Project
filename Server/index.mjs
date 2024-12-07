import express from "express";
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

// Cors configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());

app.use(
  cors({
    origin: "https://web-programming-final-project-fitness-app.onrender.com",
  })
);

app.get("/api/current-user", async (_req, res) => {
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not logged in" });
  }
});

// Serve static files in production
app.use(express.static(path.join(__dirname, "../Client/dist")));

// API Routes
app.use("/api/v1/auth", authController);
app.use("/api/v1/users", userController);
app.use("/api/v1/workouts", workoutController);
app.use("/api/v1/friends", friendController);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
