// src/api/authApi.js
import axiosClient from "./axiosClient"

console.log(axiosClient,"axiosClient")
const USE_MOCK_API = true; // toggle between mock and real

const newAuthApi = {
  // ✅ ReqRes login endpoint
  login: (email, password) => 
    
    USE_MOCK_API
      ? axiosClient.post("", { email, password }) // mock endpoint doesn’t use /login
      : axiosClient.post("/login", { email, password }),

  // Dummy logout (ReqRes doesn’t have this endpoint)
  logout: () => Promise.resolve({ success: true }),

  // Dummy refreshToken (ReqRes doesn’t support refresh tokens)
  refreshToken: (refreshToken) =>
    Promise.resolve({ token: "dummy-refreshed-token" }),
};

export default newAuthApi;
