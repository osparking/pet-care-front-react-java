import { api } from "../utils/api";

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify_email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendEmail = async (email) => {
  try {
    const response = await api.post(`/auth/resend_email?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("재전송 요구: ", error);
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

export async function requestPasswordReset(email) {
  try {
    const response = await api.post("/auth/req_password_reset", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
}
