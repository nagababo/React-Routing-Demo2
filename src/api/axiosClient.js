// api/axiosClient.js
import axios from "axios";
import envConfig from "../config/envConfig";
import { getUserFromStorage, logoutUser } from "../services/authService";

// // ✅ Create Axios instance
// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL, // .env driven
//     headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 10000, // 10s timeout (optional but good practice)
// });

// const axiosClient = axios.create({
//   baseURL: "https://reqres.in/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: envConfig.TIMEOUT, //10s timeout (optional but good practice)
// });


const USE_MOCK_API = true;

const axiosClient = axios.create({
  baseURL: USE_MOCK_API
    ? "https://run.mocky.io/v3/5185415ba171ea3a00704eed"
    : "https://reqres.in/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ✅ Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const user = getUserFromStorage();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);


// ✅ Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response, // pass through successful responses
  async (error) => {
    // Handle unauthorized (401) errors globally
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized → Logging out user");

      // Logout user from local storage
      logoutUser();

      // Optional: redirect to login page (if not already there)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Handle network errors or server errors
    if (!error.response) {
      console.error("Network error:", error.message);
    } else if (error.response.status >= 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
