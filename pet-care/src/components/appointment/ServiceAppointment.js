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

export const updateApmt = async function updateApmt(apmtId, apmt) {
  try {
    const result = await api.put(`/appointments/${apmtId}/update`, apmt);
    console.log("예약 갱신 - api 호출 결과 메시지: ", result.data.message);
    return result;
  } catch (err) {
    throw err;
  }
};
