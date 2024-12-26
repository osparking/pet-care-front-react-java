import { api } from "../utils/api";

export async function getUserById(userId) {
  try {
    const result = await api.get(`/users/user/${userId}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function registUser(user) {
  try {
    const result = await api.post("/users/register", user);
    return result.data;
  } catch (err) {
    throw err;
  }
}
