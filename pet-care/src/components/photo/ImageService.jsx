import { api } from "../utils/api";

export async function updateUserPhoto(photoId, photo) {
  try {
    const response = await api.put(`/photos/${photoId}/update`, photo, {
      headers: { "Content-Type": "application/octet-stream" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
