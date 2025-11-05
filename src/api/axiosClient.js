
// api/axiosClient.js
import axios from "axios";
import envConfig from "../config/envConfig";
import { getUserFromStorage, setUserToStorage, logoutUser } from "../features/auth/authService";

// ============================================================
// CONFIGURATION
// ============================================================
const USE_MOCK_API = false; // set to true if using mock
const axiosClient = axios.create({
  baseURL: USE_MOCK_API
    ? "https://run.mocky.io/v3/5185415ba171ea3a00704eed" // mocky.io simple echo API
    : "https://dummyjson.com", // 🔥 dummyjson has real auth endpoints
  headers: { "Content-Type": "application/json" },
  timeout: envConfig.TIMEOUT || 10000,
});

// ============================================================
// TOKEN REFRESH LOGIC (mocked)
// ============================================================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

async function refreshAccessToken(oldRefreshToken) {
  try {
    // Dummy refresh endpoint simulation
    const response = await axios.post("https://dummyjson.com/auth/refresh", {
      refreshToken: oldRefreshToken,
    });

    // You can store new tokens here
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    const user = getUserFromStorage();
    if (user) {
      user.token = newAccessToken;
      user.refreshToken = newRefreshToken;
      setUserToStorage(user);
    }

    return newAccessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    logoutUser();
    throw err;
  }
}

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================
axiosClient.interceptors.request.use(
  (config) => {
    const user = getUserFromStorage();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const user = getUserFromStorage();

    // Handle unauthorized (401)
    if (error.response?.status === 401 && user?.refreshToken) {
      if (originalRequest._retry) {
        // Already retried once → fail
        logoutUser();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Queue all requests until refresh completes
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Begin refresh flow
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken(user.refreshToken);
        isRefreshing = false;
        processQueue(null, newToken);

        // Retry original request
        originalRequest.headers.Authorization = "Bearer " + newToken;
        return axiosClient(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);
        logoutUser();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    // Network or server errors
    if (!error.response) {
      console.error("Network error:", error.message);
    } else if (error.response.status >= 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;


// // api/axiosClient.js
// import axios from "axios";
// import envConfig from "../config/envConfig";
// import { getUserFromStorage, logoutUser } from "../services/authService";

// // // ✅ Create Axios instance
// // const axiosClient = axios.create({
// //   baseURL: import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL, // .env driven
// //     headers: {
// //     "Content-Type": "application/json",
// //   },
// //   timeout: 10000, // 10s timeout (optional but good practice)
// // });

// // const axiosClient = axios.create({
// //   baseURL: "https://reqres.in/api",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   timeout: envConfig.TIMEOUT, //10s timeout (optional but good practice)
// // });


// const USE_MOCK_API = true;

// const axiosClient = axios.create({
//   baseURL: USE_MOCK_API
//     ? "https://run.mocky.io/v3/5185415ba171ea3a00704eed"
//     : "https://reqres.in/api",
//   headers: { "Content-Type": "application/json" },
//   timeout: 10000,
// });

// // ✅ Request Interceptor
// axiosClient.interceptors.request.use(
//   (config) => {
//     const user = getUserFromStorage();
//     if (user?.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );


// // ✅ Response Interceptor
// axiosClient.interceptors.response.use(
//   (response) => response, // pass through successful responses
//   async (error) => {
//     // Handle unauthorized (401) errors globally
//     if (error.response && error.response.status === 401) {
//       console.warn("401 Unauthorized → Logging out user");

//       // Logout user from local storage
//       logoutUser();

//       // Optional: redirect to login page (if not already there)
//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }

//     // Handle network errors or server errors
//     if (!error.response) {
//       console.error("Network error:", error.message);
//     } else if (error.response.status >= 500) {
//       console.error("Server error:", error.response.data);
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
