// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "Context/AuthContext";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        {isAuthenticated ? (
          <Route path="admin/*" element={<AdminLayout />} />
        ) : (
          <Route
            path="admin/*"
            element={<Navigate to="/auth/sign-in" replace />}
          />
        )}
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
