// src/features/users/userService.js
import { userApi } from "./userApi";

export const userService = {
  async fetchUsers(limit = 10, skip = 0) {
    const data = await userApi.getUsers(limit, skip);

    // Shape data for UI if needed
    return data.users.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    }));
  },
};
