import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { setAccessToken, removeAccessToken, setRefreshToken, removeRefreshToken } from "../utils/jwt";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token && token !== undefined) {
      const decoded = jwtDecode(token.accessToken);
      setUser(decoded);
    }
  }, [token]);

  const login = (token) => {
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
    setToken(token);
  };

  const register = (token) => {
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
    setToken(token);
  }

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};