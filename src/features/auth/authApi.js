// src/api/authApi.js
import axiosClient from "../../api/axiosClient";

const USE_MOCK_API = true; // ✅ use mock mode

const authApi = {
  login: async (username, password) => {
    if (USE_MOCK_API) {
      // Simulate delay + fake response
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            data: {
              token: "mock-access-token-123",
              refreshToken: "mock-refresh-token-456",
              user: {
                id: 1,
                name: username === "admin" ? "Admin User" : "Mock User",
                email: `${username}@demo.com`,
                role: username === "admin" ? "admin" : "user",
              },
            },
          });
        }, 800)
      );
    }

    // 🔹 Real API (optional fallback)
    const res = await axiosClient.post("https://dummyjson.com/auth/login", {
      username,
      password,
    });
    return {
      data: {
        token: res.data.token,
        refreshToken: "dummy-refresh-token",
        user: {
          id: res.data.id,
          name: `${res.data.firstName} ${res.data.lastName}`,
          email: res.data.email,
          role: "user",
        },
      },
    };
  },

  logout: () => Promise.resolve({ success: true }),

  refreshToken: () =>
    Promise.resolve({
      data: {
        token: "mock-refreshed-token",
        refreshToken: "mock-new-refresh-token",
      },
    }),
};

export default authApi;
