import { api } from "../utils/api";

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify_email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userLogin = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const userLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRoles");
  localStorage.removeItem("authToken");
  window.location.href = "/";
};
