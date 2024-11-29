import { api } from "../utils/api";

export async function getVets() {
  try {
    const result = await api.get("/vets/get_all_vets");
    return result.data;
  } catch (err) {
    throw err;
  }
}
