import authApi from "../api/authApi";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export async function loginUser(username, password) {
  const { data } = await authApi.login(username, password);
  const { token, user } = data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { ...user, token };
}

export function getUserFromStorage() {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  return user && token ? { ...JSON.parse(user), token } : null;
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
