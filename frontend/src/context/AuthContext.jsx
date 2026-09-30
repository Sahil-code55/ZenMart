import { createContext, useContext, useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../api/auth.api";

import {
  setAccessToken,
  clearAccessToken,
} from "../services/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setToken] = useState(null);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
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