export async function saveReview(patId, vetId, review) {
  try {
    const response = await api.post(
      `reviews/create?patientId=${patId}&vetId=${vetId}`,
      review
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
