import { api } from "../utils/api";

export async function getVets() {
  try {
    const result = await api.get("/vets/get-all-vets");
    return result.data;
  } catch (err) {
    throw err;
  }
}
