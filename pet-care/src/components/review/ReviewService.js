import { api } from "../utils/api";
export async function saveReview(patId, vetId, review) {
  try {
    console.log("ID, ID, Review", patId, vetId, review);
    const token = localStorage.getItem("authToken");
    const response = await api.post(
      `reviews/create?patientId=${patId}&vetId=${vetId}`,
      review,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
