import { api } from "../utils/api";

export async function bookAppointment({ senderId, recipientId, request }) {
  try {
    const result = await api.post(
      `/appointments/book_appointment/${senderId}/${recipientId}`,
      request
    );
    return result.data;
  } catch (err) {
    throw err;
  }
}
