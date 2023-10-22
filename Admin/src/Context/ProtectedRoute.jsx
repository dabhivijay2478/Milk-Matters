// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ element, path }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/auth/sign-in" replace />
  );
}

export default ProtectedRoute;
