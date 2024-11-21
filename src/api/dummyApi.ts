import axios from "axios";
import { refreshToken } from "../services/authService";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

api.interceptors.response.use(
  (response) => response, // Return the response if no errors
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken();

        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
