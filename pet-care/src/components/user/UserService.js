import { api } from "../utils/api";

export async function getUserById(userId) {
  try {
    const result = await api.get(`/users/user/${userId}`);
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

export async function changePwd(userId, curPwd, newPwd, cnfPwd) {
  try {
    const request = { currentPwd: curPwd, newPwd, confirmPwd: cnfPwd };
    const result = await api.put(`/users/${userId}/change_pwd`, request);
    return result.data;
  } catch (err) {
    throw err;
  }
}
