import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
config();

/**
 * @typedef {import('../../Client/src/model/supabase').Database } ProductDatabase
 * @typedef {import('@supabase/supabase-js').SupabaseClient<ProductDatabase>} ProductClient
 */

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

let currentUser = null;
export function setCurrentUser(user) {
  currentUser = user;
}
supabase.auth.onAuthStateChange((_event, session) => {
  setCurrentUser(session?.user || null);
});

// Listen for authentication state changes
supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    currentUser.value = session.user;
  } else {
    currentUser = null;
  }
});

// Function to sign up
export async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("Error signing up:", error.message);
  } else {
    currentUser.value = user;
  }
}

// Function to login
export async function login(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error logging in:", error.message);
  } else {
    currentUser.value = user;
  }
}

// Function to sign out
export async function signOut() {
  await supabase.auth.signOut();
  currentUser.value = null;
}

export function getConnection() {
  return supabase;
}

export function getCurrentUser() {
  return currentUser;
}
