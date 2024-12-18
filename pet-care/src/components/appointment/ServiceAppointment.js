import { api } from "../utils/api";

export async function bookAppointment(senderId, recipientId, request) {
  try {
    const result = await api.post(
      `/appointments/create?senderId=${senderId}&recipientId=${recipientId}`,
      request
    );
    return result.data;
  } catch (err) {
    throw err;
  }
}
