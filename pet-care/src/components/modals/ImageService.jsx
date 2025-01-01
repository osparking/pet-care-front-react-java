import { api } from "../utils/api";

export async function updateUserPhoto(photoId, photo) {
  try {
    console.log("photo Id: " + photoId);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("file", photo);
    const response = await api.put(`/photos/${photoId}/update`, formData, {
      headers: { "Content-Type": "application/octet-stream" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uploadUserPhoto(userId, photo) {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("file", photo);
    const response = await api.post("/photos/upload", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserPhoto(userId) {
  try {
    const response = await api.delete(`/photos/${userId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
