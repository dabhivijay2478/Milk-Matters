// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);

  const login = (role) => {
    setUserRole(role);
    console.log(userRole);
  };

  const logout = () => {
    setUserRole(null);
  };

  const isAuthenticated = !!userRole;

  return (
    <AuthContext.Provider value={{ userRole, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
