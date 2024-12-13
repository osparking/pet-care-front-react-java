import { api } from "../utils/api";

export async function getPetTypes() {
  try {
    const result = await api.get("/pets/get_types");
    return result.data;
  } catch (error) {
    throw error;
  }
}
