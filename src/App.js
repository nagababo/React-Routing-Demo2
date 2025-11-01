import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Layout from "./layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Admin  from "./pages/Admin";
import Home from "./pages/Home"
import { AuthProvider } from "./context/AuthContext";

import { NewAuthProvider } from "./context/NewAuthContext";

function App() {
  return (
    <AuthProvider>
          <NewAuthProvider>

    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {/* Define a route for Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/home" element={<Home/>} />

         
          
        </Route>

      </Routes>
    </Router>
      </NewAuthProvider>

    </AuthProvider>

  );
}

export default App;
