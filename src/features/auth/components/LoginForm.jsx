

// src/pages/Login.js
import React, { useState } from "react";
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("Nagababu"); // default dummy user
  const [password, setPassword] = useState("Password");    // default dummy password
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedUser = await login(username, password);
      console.log("✅ Logged in as:", loggedUser);

      // Navigate based on role (optional)
      if (loggedUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login Page</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "inline-block",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
      </form>
    </div>
  );
}


// // src/pages/Login.js
// import { useAuth } from "../../../context/AuthContext"
// import { useNavigate } from "react-router-dom";
// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const handleLogin = (role) => {
//     login("testUser", role);
//     navigate("/dashboard");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: 80 }}>
//       <h2>Login Page</h2>
//       <button onClick={() => handleLogin("user")}>Login as User</button>
//       <button onClick={() => handleLogin("admin")}>Login as Admin</button>
//     </div>
//   );
// }
