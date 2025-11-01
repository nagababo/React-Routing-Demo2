// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import newAuthApi from "../api/newAuthApi"

const NewAuthContext = createContext();

export const NewAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      console.log("DEBUG LOGIN CALL:", email, password);

      const response = await newAuthApi.login(email, password);
      console.log("DEBUG RESPONSE:", response);

      const token = response.data.token;

      setUser({ email });
      setToken(token);
      localStorage.setItem("token", token);
    } catch (err) {
      setError("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await newAuthApi.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <NewAuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {children}
    </NewAuthContext.Provider>
  );
};

export const useNewAuth = () => useContext(NewAuthContext);
