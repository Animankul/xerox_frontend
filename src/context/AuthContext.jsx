import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    token: localStorage.getItem("token"),
    xeroxId: localStorage.getItem("xeroxId"),
  }));

  const login = ({ xeroxId }, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("xeroxId", xeroxId);
    setAuth({ token, xeroxId });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, xeroxId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ ADD THIS EXPORT
export const useAuth = () => useContext(AuthContext);
