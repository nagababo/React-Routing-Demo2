// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
 // const { isAuthenticated } = useAuth();
 const isAuthenticated= true
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
