import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express.Router();

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        "x-supabase-role": "service_role",
      },
    },
  }
);

app.delete("/delete/:id", async (req, res, _next) => {
  try {
    const { id } = req.params;
    console.log("Attempting to delete user:", id);

    // First check if target user is an admin
    const { data: targetUser, error: checkError } = await supabase
      .from("users")
      .select("role")
      .eq("id", id)
      .single();

    if (checkError) {
      console.error("Error checking user role:", checkError);
      return res.status(500).json({
        error: "Error checking user role",
      });
    }

    if (targetUser.role === "admin") {
      return res.status(403).json({
        error: "Cannot delete Admin User",
      });
    }

    // If not admin, proceed with deletion (both here and in database policy)
    // Delete user's workouts
    const { error: workoutsError } = await supabase
      .from("workouts")
      .delete()
      .eq("userid", id);

    if (workoutsError) {
      console.error("Error deleting workouts:", workoutsError);
    }

    // Delete friend connections
    const { error: friendsError } = await supabase
      .from("friends")
      .delete()
      .or(`userid.eq.${id},friendid.eq.${id}`);

    if (friendsError) {
      console.error("Error deleting friends:", friendsError);
    }

    // Then delete the user record from users table
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (userError) {
      console.error("Error deleting user record:", userError);
      return res.status(500).json({
        error: userError.message,
      });
    }

    // Finally delete from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(id);

    if (authError) {
      console.error("Error deleting auth user:", authError);
      return res.status(500).json({
        error: authError.message,
      });
    }

    console.log("User successfully deleted");
    res.json({ data: { message: "User deleted successfully" } });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("Auth error:", authError);
      return res.status(401).json({
        error: authError.message,
      });
    }

    if (!authData.user) {
      return res.status(401).json({
        error: "No user found",
      });
    }

    console.log("Auth successful for user:", authData.user.id);

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (userError) {
      console.error("User data error:", userError);
      return res.status(500).json({
        error: "Error fetching user data",
      });
    }

    // Send the data
    res.json({
      data: userData,
    });
  } catch (err) {
    console.error("Server error:", err);
    next(err);
  }
});

app.post("/logout", async (req, res, next) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase signout error:", error);
      throw error;
    }
    res.json({ data: { message: "Successfully logged out" } });
  } catch (err) {
    console.error("Server logout error:", err);
    next(err);
  }
});

app.post("/register", async (req, res, _next) => {
  try {
    console.log("Registration request received:", req.body);

    // Create auth user first
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.admin.createUser({
      email: req.body.email,
      password: req.body.password,
      email_confirm: true,
    });

    if (authError) {
      console.error("Auth creation error:", authError);
      return res.status(400).json({
        error: authError.message,
      });
    }

    console.log("Auth user created successfully:", user.id);

    // Prepare user profile data
    const userProfile = {
      id: user.id,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      role: req.body.role || "user",
      image: req.body.image || "https://dummyjson.com/icon/user/128",
      ip: req.body.ip || "0.0.0.0",
      macaddress: req.body.macaddress || "00:00:00:00:00:00",
    };

    console.log("Creating user profile with:", userProfile);

    // Create user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([userProfile])
      .select()
      .single();

    if (userError) {
      console.error("Profile creation error:", userError);
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(user.id);
      return res.status(500).json({
        error: userError.message,
      });
    }

    console.log("User profile created successfully:", userData);
    res.status(201).json({ data: userData });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      error: err.message || "Registration failed",
    });
  }
});

app.get("/verify", async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(401).json({
        error: "No user ID provided",
      });
    }

    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !userData) {
      return res.status(401).json({
        error: "Invalid user",
      });
    }

    res.json({ data: userData });
  } catch (err) {
    next(err);
  }
});

export default app;
