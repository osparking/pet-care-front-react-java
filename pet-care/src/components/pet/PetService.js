import { api } from "../utils/api";

export async function getPetTypes() {
    try {
      const result = await api.get("/pets/get_types");
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  export async function getPetColors() {
    try {
      const result = await api.get("/pets/get_colors");
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  export async function getPetBreeds(type) {
    try {
      const result = await api.get("/pets/get_breeds");
      return result.data;
    } catch (error) {
      throw error;
    }
  }
