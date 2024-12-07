import { getConnection } from "./supabase.js";
const conn = getConnection();

export async function getAll() {
  const { data, error } = await conn.from("friends").select(`
    *,
    friend:friendid (
      id,
      firstname,
      lastname,
      username,
      image
    )
  `);

  return error ? { error: error.message } : { data };
}

export async function getUserFriends(userId) {
  const { data, error } = await conn
    .from("friends")
    .select(
      `
      *,
      friend:friendid (
        id,
        firstname,
        lastname,
        username,
        image
      )
    `
    )
    .eq("userid", userId);

  return error ? { error: error.message } : { data };
}

export async function add(friendData) {
  // First check if the friendship already exists
  const { data: existing, error: checkError } = await conn
    .from("friends")
    .select("*")
    .eq("userid", friendData.userid)
    .eq("friendid", friendData.friendid)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    return { error: checkError.message };
  }

  if (existing) {
    return { data: existing };
  }

  // If no existing friendship, create new one
  const { data, error } = await conn
    .from("friends")
    .insert([
      {
        userid: friendData.userid,
        friendid: friendData.friendid,
      },
    ])
    .select();

  return error ? { error: error.message } : { data: data[0] };
}

export async function remove(userId, friendId) {
  const { error } = await conn
    .from("friends")
    .delete()
    .eq("userid", userId)
    .eq("friendid", friendId);

  return error
    ? { error: error.message }
    : { data: { message: "Successfully unfollowed" } };
}
