import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express.Router();

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

app.delete("/delete/:id", async (req, res) => {
  console.log("Delete route hit");
  console.log("Params:", req.params);
  const userId = req.params.id;

  try {
    // First delete user from the database table
    const { error: dbError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (dbError) {
      console.error("Database delete error:", dbError);
      return res.status(500).json({
        error: dbError.message,
      });
    }

    console.log("User deleted from database, now deleting from auth...");

    // Then delete from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      console.error("Auth delete error:", authError);
      return res.status(500).json({
        error: authError.message,
      });
    }

    console.log("User successfully deleted from both database and auth");
    return res.json({ data: { message: "User deleted successfully" } });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({
      error: "Failed to delete user",
      details: err.message,
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

    // Try to get the table structure first
    const { data: tableInfo, error: tableError } = await supabase
      .from("users")
      .select()
      .limit(1);

    console.log(
      "Current table structure:",
      tableInfo ? Object.keys(tableInfo[0]) : "No data"
    );

    // Create auth user first
    const authResponse = await supabase.auth.admin.createUser({
      email: req.body.email,
      password: req.body.password,
      email_confirm: true,
    });

    if (authResponse.error) {
      console.error("Auth creation error:", authResponse.error);
      return res.status(400).json({
        error: authResponse.error.message,
      });
    }

    console.log("Auth user created successfully:", authResponse.data.user.id);

    // Prepare user profile data
    const userProfile = {
      id: authResponse.data.user.id,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      role: req.body.role || "user",
      // Optional fields
      phone: req.body.phone || null,
      age: req.body.age || null,
      gender: req.body.gender || null,
      address: req.body.address || null,
      city: req.body.city || null,
      state: req.body.state || null,
      country: req.body.country || null,
      image: req.body.image || "https://dummyjson.com/icon/user/128",
      ip: req.body.ip || "0.0.0.0",
      macaddress: req.body.macaddress || "00:00:00:00:00:00",
    };

    console.log("Attempting to create user profile with:", userProfile);

    // Try to insert user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([userProfile])
      .select()
      .single();

    if (userError) {
      console.error("Profile creation error:", userError);
      // If profile creation fails, clean up the auth user
      const { error: cleanupError } = await supabase.auth.admin.deleteUser(
        authResponse.data.user.id
      );

      if (cleanupError) {
        console.error(
          "Failed to cleanup auth user after profile creation failed:",
          cleanupError
        );
      }

      return res.status(500).json({
        error: userError.message,
        details: userError,
      });
    }

    console.log("User profile created successfully:", userData);
    res.status(201).json({ data: userData });
  } catch (err) {
    console.error("Full registration error:", err);
    res.status(500).json({
      error: "Registration failed",
      details: err.message,
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
