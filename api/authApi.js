import axiosClient from "./axiosClient";

const authApi = {
  login: (username, password) =>
    axiosClient.post("/auth/login", { username, password }),

  logout: () => axiosClient.post("/auth/logout"),

  refreshToken: (refreshToken) =>
    axiosClient.post("/auth/refresh", { refreshToken }),
};

export default authApi;
