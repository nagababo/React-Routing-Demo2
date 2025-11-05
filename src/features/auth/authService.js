// src/services/authService.js
import authApi from "./authApi";

const TOKEN_KEY = "authToken";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "authUser";

// ✅ LOGIN
export async function loginUser(username, password) {
  const { data } = await authApi.login(username, password);
  const { token, refreshToken, user } = data;

  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { ...user, token, refreshToken };
}

// ✅ GET USER
export function getUserFromStorage() {
  const token = localStorage.getItem(TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  const user = localStorage.getItem(USER_KEY);

  return user && token ? { ...JSON.parse(user), token, refreshToken } : null;
}

// ✅ LOGOUT
export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

// ✅ UPDATE TOKENS (used by axiosClient refresh logic)
export function updateTokens(newToken, newRefreshToken) {
  localStorage.setItem(TOKEN_KEY, newToken);
  if (newRefreshToken) localStorage.setItem(REFRESH_KEY, newRefreshToken);
}

// ✅ (Optional) SET USER — useful if you still use it in axiosClient
export function setUserToStorage(user) {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (user.token) localStorage.setItem(TOKEN_KEY, user.token);
  if (user.refreshToken) localStorage.setItem(REFRESH_KEY, user.refreshToken);
}
