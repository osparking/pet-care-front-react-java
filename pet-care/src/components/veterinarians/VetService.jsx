import { api } from "../utils/api";

export async function getVets() {
  try {
    const result = await api.get("/vets/get_all_vets");
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function findAvailableVets(searchParams) {
  try {
    const queryParams = new URLSearchParams(searchParams);

    const result = await api.get(
      `/vets/search_vets?${queryParams}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}