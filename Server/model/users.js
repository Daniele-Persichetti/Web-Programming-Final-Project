import { getConnection } from "./supabase.js";
const conn = getConnection();

export async function getAll() {
  const { data, error } = await conn.from("users").select("*");

  return error ? { error: error.message } : { data };
}

export async function get(id) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return error ? { error: error.message } : { data };
}

export async function add(user) {
  const { data, error } = await conn.from("users").insert([user]).select();

  return error ? { error: error.message } : { data: data[0] };
}

export async function update(id, user) {
  const { data, error } = await conn
    .from("users")
    .update(user)
    .eq("id", id)
    .select();

  return error ? { error: error.message } : { data: data[0] };
}

export async function remove(id) {
  const { error } = await conn.from("users").delete().eq("id", id);

  return error
    ? { error: error.message }
    : { data: { message: "User deleted successfully" } };
}
