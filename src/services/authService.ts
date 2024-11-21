import axios from "axios";

const API_URL = "https://dummyjson.com/auth";
const REFRESH_URL = "https://dummyjson.com/auth/refresh";

export const login = async (username: string, password: string) => {
  console.log("login");

  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    // Store token and user info in local storage
    console.log("response.data.token", response.data.accessToken);

    localStorage.setItem("authToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
};

export const getToken = () => localStorage.getItem("authToken");

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      REFRESH_URL,
      { expiresInMins: 30 },
      { withCredentials: true }
    );
    const newAccessToken = response.data.accessToken;

    localStorage.setItem("authToken", newAccessToken);

    return newAccessToken;
  } catch (error: any) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );
    throw new Error("Token refresh failed");
  }
};
