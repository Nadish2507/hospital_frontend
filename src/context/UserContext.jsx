import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || null
  );

  const login = (u) => {
    localStorage.setItem("activeUser", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("activeUser");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
