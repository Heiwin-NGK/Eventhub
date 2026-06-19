import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const res = await authService.getCurrentUser(token);

      setUser(res.data);

    } catch (error) {

      localStorage.removeItem("token");
      setUser(null);

    } finally {

      setLoading(false);

    }

  };

  const login = (data) => {

    localStorage.setItem("token", data.token);

    setUser(data.user);

  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};