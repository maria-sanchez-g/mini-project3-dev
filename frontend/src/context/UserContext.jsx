import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
    }
  }, [userName]);

  const logout = () => {
    setUserName("");  // clears context
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, logout }}>
      {children}
    </UserContext.Provider>
  );
}
