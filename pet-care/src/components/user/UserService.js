import { api } from "../utils/api";

export async function getUserById(userId) {
  try {
    const result = await api.get(`/users/user/${userId}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteUserAccount(userId) {
  try {
    const result = await api.delete(`/users/delete/${userId}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function registUser(user) {
  try {
    const result = await api.post("/users/register", user);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function updateUser(userId, user) {
  try {
    const result = await api.put(`/users/update/${userId}`, user);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function changePwd(userId, curPwd, newPwd, cnfPwd) {
  try {
    const request = { currentPwd: curPwd, newPwd, confirmPwd: cnfPwd };
    const result = await api.put(`/users/${userId}/change_pwd`, request);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function countVet() {
  try {
    const result = await api.get("/users/vet/count");
    return result.data.data;
  } catch (err) {
    throw err;
  }
}

export async function countPatient() {
  try {
    const result = await api.get("/users/patient/count");
    return result.data.data;
  } catch (err) {
    throw err;
  }
}
