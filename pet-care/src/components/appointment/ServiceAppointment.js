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
    return result;
  } catch (err) {
    throw err;
  }
};

export const cancelApmt = async (apmtId) => {
  try {
    const result = await api.put(`/appointments/${apmtId}/cancel`);
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const approveApmt = async (apmtId) => {
  try {
    const result = await api.put(`/appointments/${apmtId}/approve`);
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const declineApmt = async (apmtId) => {
  try {
    const result = await api.put(`/appointments/${apmtId}/decline`);
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const getApmtById = async function (apmtId) {
  try {
    const result = await api.get(`/appointments/${apmtId}/get_id`, {
      validateStatus: function (status) {
        return status === 302;
      },
    });
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const getAppoCount = async () => {
  try {
    const result = await api.get(`/appointments/count`);
    return result.data;
  } catch (err) {
    throw err;
  }
};
