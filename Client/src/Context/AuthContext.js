// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userRole, setUserRole] = useState(null);
    const [userID, setUserID] = useState(null);

    const login = (role, userId) => {
        setUserRole(role);
        setUserID(userId);
    };

    const logout = () => {
        setUserRole(null);
        setUserID(null);
    };

    const isAuthenticated = !!userRole;

    return (
        <AuthContext.Provider
            value={{ userRole, userID, login, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
