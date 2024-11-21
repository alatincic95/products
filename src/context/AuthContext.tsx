import React, { createContext, useState, useContext, useEffect } from "react";
import { login, logout, getUser, refreshToken } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const handleLogin = async (username: string, password: string) => {
    try {
      const userData = await login(username, password);
      setIsAuthenticated(true);
      setUser(userData); // Store the user data on successful login
    } catch (error: any) {
      console.log("error", error);
      setIsAuthenticated(false);
      throw new Error(error || "Login failed");
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  console.log("isAuthenticated", isAuthenticated);

  // Function to check if the token is valid
  const checkTokenValidity = () => {
    const token = localStorage.getItem("authToken");
    if (!token || token === "INVALID_TOKEN") {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("authToken");
      navigate("/login"); // Redirect to login if invalid token
    } else {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkTokenValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshToken();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        logout();
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
