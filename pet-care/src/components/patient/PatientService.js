import { api } from "../utils/api";

export async function getPatients() {
  try {
    const response = await api.get("/users/get_all_patients", {
      validateStatus: function (status) {
        return true;
      },
    });
    console.log("반응자료:", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
}
