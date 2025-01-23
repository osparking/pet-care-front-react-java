import { api } from "../utils/api";

export async function getPatients() {
  try {
    const response = await api.get("/users/get_all_patients");
    return response.data;
  } catch (err) {
    throw err;
  }
}
