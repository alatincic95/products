import axios from "axios";
import { refreshToken } from "../services/authService";

const api = axios.create({
  baseURL: "https://dummyjson.com", // Adjust as needed
});

api.interceptors.response.use(
  (response) => response, // Return the response if no errors
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken();

        // Retry the original request with the new access token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        // Optionally redirect to the login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
