// src/pages/Login.js
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (role) => {
    login("testUser", role);
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2>Login Page</h2>
      <button onClick={() => handleLogin("user")}>Login as User</button>
      <button onClick={() => handleLogin("admin")}>Login as Admin</button>
    </div>
  );
}
