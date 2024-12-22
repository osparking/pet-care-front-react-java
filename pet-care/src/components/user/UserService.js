import { api } from "../utils/api";

export async function getUserById(userId) {
  try {
    const result = await api.get(`/user/${userId}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}
