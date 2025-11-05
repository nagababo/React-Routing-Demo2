// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  getUserFromStorage,
  updateTokens,
} from "../auth/authService";
import authApi from "../auth/authApi";

// ✅ Create the context
const AuthContext = createContext();

// ✅ Hook to use AuthContext easily in components
export const useAuth = () => useContext(AuthContext);

// ✅ Provider component (wrap your App with this)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());
  const [loading, setLoading] = useState(false);

  // --- LOGIN ---
  const login = async (username, password) => {
    setLoading(true);
    try {
      const loggedUser = await loginUser(username, password);
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- LOGOUT ---
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // --- REFRESH TOKEN ---
  const refreshAuthToken = async () => {
    if (!user?.refreshToken) return;
    try {
      const { data } = await authApi.refreshToken(user.refreshToken);
      if (data?.token) {
        const updatedUser = {
          ...user,
          token: data.token,
          refreshToken: data.refreshToken || user.refreshToken,
        };
        setUser(updatedUser);
        updateTokens(data.token, data.refreshToken);
        console.log("🔁 Token refreshed");
      }
    } catch (err) {
      console.error("Failed to refresh token:", err);
      logout();
    }
  };

  // --- AUTO LOGIN ON PAGE REFRESH ---
  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) setUser(storedUser);
  }, []);

  // --- OPTIONAL: Periodic Token Refresh (every 14 mins for example) ---
  useEffect(() => {
    if (!user?.refreshToken) return;
    const interval = setInterval(() => {
      refreshAuthToken();
    }, 14 * 60 * 1000); // every 14 minutes
    return () => clearInterval(interval);
  }, [user]);

  // --- Provide context values ---
  const value = {
    user,
    loading,
    login,
    logout,
    refreshAuthToken,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
