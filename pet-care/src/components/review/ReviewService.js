export async function saveReview(patId, vetId, review) {
  try {
    console.log("ID, ID, Review", patId, vetId, review);
    const response = await api.post(
      `reviews/create?patientId=${patId}&vetId=${vetId}`,
      review
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
