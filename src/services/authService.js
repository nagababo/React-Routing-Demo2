// src/services/authService.js

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

// ✅ Simulated login API call
export async function loginUser(username, password) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated API response
  if (username === "admin" && password === "1234") {
    const userData = {
      username,
      role: "admin",
      token: "fake-jwt-token-1234",
    };

    // Save to localStorage
    localStorage.setItem(TOKEN_KEY, userData.token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));

    return userData;
  } else {
    throw new Error("Invalid credentials");
  }
}

// ✅ Logout
export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// ✅ Restore user from storage
export function getUserFromStorage() {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}
