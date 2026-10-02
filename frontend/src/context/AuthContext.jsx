/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
} from "../api/auth.api";

import {
  setAccessToken,
  clearAccessToken,
} from "../services/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    setAccessToken(data.accessToken);
    setToken(data.accessToken);

    const userData = await getCurrentUser();
    setUser(userData.user || userData);

    return data;
  };

  const register = async (userData) => {
    return await registerUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      clearAccessToken();
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await refreshAccessToken();

        setAccessToken(data.accessToken);
        setToken(data.accessToken);

        const userData = await getCurrentUser();
        setUser(userData.user || userData);
      } catch {
        clearAccessToken();
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        authLoading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}