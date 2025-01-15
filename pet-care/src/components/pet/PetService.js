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

export async function getPetBreeds(type = "") {
  try {
    let result;
    if (type === "") {
      result = await api.get("/pets/get_breeds");
    } else {
      result = await api.get(`/pets/get_breeds?type=${type}`);
    }
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePetAPI(petId, updatedPet) {
  try {
    const result = await api.put(`/pets/${petId}/update`, updatedPet);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePetAPI(petId, updatedPet) {
  try {
    const result = await api.delete(`/pets/${petId}/delete`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function insertPet(apmtId, pet) {
  try {
    const result = await api.post(`/pets/${apmtId}/insert`, pet);
    return result.data;
  } catch (err) {
    throw err;
  }
}