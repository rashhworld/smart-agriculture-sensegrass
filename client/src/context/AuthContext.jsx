// Importing necessary hooks and utilities from React
import { createContext, useContext, useState, useEffect } from "react";

// Creating the context for authentication
const AuthContext = createContext();

// AuthProvider component as a wrapper
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check the authentication status when the component is mounted from localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  // Sets the token in localStorage and updates the authentication state
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Removes the token from localStorage and updates the authentication state
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // Return the AuthContext.Provider with authentication values passed to children
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, setIsLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context values
export const useAuth = () => useContext(AuthContext);
