import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userEmail");
    if (stored) setUserEmail(stored);
  }, []);

  const login = (email, token) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("token", token);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
