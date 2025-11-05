// src/features/users/userApi.js
import axiosClient from "../../api/axiosClient";

export const userApi = {
  getUsers: async (limit = 10, skip = 0) => {
    // Example: https://dummyjson.com/users?limit=10&skip=0

    console.log(axiosClient,"axiosClient")
    const response = await axiosClient.get(`/users?limit=${limit}&skip=${skip}`);
    return response.data; // API returns { users, total, skip, limit }
  },
};

