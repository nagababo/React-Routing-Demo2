// src/features/users/userSelector.js

// ✅ Base selector (optional helper)
export const selectUserState = (state) => state.users;

// ✅ Specific selectors
export const selectAllUsers = (state) => state.users.users;

export const selectUsersLoading = (state) => state.users.loading;

export const selectUsersError = (state) => state.users.error;
