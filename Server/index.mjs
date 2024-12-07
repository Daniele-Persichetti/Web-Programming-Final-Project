import express from "express";
import cors from "cors";
import { userController } from "./controllers/users.js";
import { workoutController } from "./controllers/workouts.js";
import { friendController } from "./controllers/friends.js";
import authController from "./controllers/auth.js";
import { getCurrentUser } from "./model/supabase.js";

const app = express();
const PORT = process.env.PORT || 3000;
const user = getCurrentUser();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/current-user", async (req, res) => {
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not logged in" });
  }
});

// API Routes
app.use("/api/v1/auth", authController);
app.use("/api/v1/users", userController);
app.use("/api/v1/workouts", workoutController);
app.use("/api/v1/friends", friendController);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send({
    error: err.message ?? "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
