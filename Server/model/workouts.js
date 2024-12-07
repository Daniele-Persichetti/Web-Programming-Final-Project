import { getConnection } from "./supabase.js";
const conn = getConnection();

export async function getAll() {
  const { data, error } = await conn
    .from("workouts")
    .select("*")
    .order("workout_date", { ascending: false });

  return error ? { error: error.message } : { data };
}

export async function getByUserId(userId) {
  console.log("Fetching workouts for:", userId);
  const { data, error } = await conn
    .from("workouts")
    .select("*")
    .eq("userid", userId)
    .order("workoutdate", { ascending: false });

  return error ? { error: error.message } : { data };
}

export async function create(workout) {
  const { data, error } = await conn
    .from("workouts")
    .insert([workout])
    .select();

  return error ? { error: error.message } : { data: data[0] };
}

export async function update(id, workout) {
  const { data, error } = await conn
    .from("workouts")
    .update(workout)
    .eq("id", id)
    .select();

  return error ? { error: error.message } : { data: data[0] };
}

export async function remove(id) {
  const { error } = await conn.from("workouts").delete().eq("id", id);

  return error
    ? { error: error.message }
    : { data: { message: "Workout deleted successfully" } };
}

export async function getFriendsWorkouts(userId) {
  // First get the user's friends
  const { data: friends, error: friendsError } = await conn
    .from("friends")
    .select("friendid")
    .eq("userid", userId);

  if (friendsError) return { error: friendsError.message };

  if (!friends.length) return { data: [] };

  // Get workouts for all friends
  const { data: workouts, error: workoutsError } = await conn
    .from("workouts")
    .select(
      `
        *,
        user:userid (
          id,
          firstname,
          lastname,
          username,
          image
        )
      `
    )
    .in(
      "userid",
      friends.map((f) => f.friendid)
    )
    .order("workoutdate", { ascending: false })
    .limit(20);

  if (workoutsError) return { error: workoutsError.message };

  return { data: workouts };
}
