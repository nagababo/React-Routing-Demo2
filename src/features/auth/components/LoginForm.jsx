import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login, user, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await login(username, password);
      console.log("✅ Logged in as:", loggedInUser?.name);

      // Navigate to dashboard if you want in real app
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error.message);
    }
  };

  // While loading (optional)
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h2>Logging in...</h2>
      </div>
    );
  }

  // ✅ Display logged-in user for test verification
  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h2>Login Successful ✅</h2>
        <p>Welcome, {user.name}</p>
      </div>
    );
  }

  // ✅ Default login form
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login Page</h2>

      <form
        onSubmit={handleLogin}
        style={{
          display: "inline-block",
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 10,
        }}
      >
        <div style={{ marginBottom: 15 }}>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: 8, width: 200 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 8, width: 200 }}
          />
        </div>

        <button
          type="submit"
          disabled={!username || !password}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: 5,
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
