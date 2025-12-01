import React, { createContext, useState, useEffect } from "react";

// create context
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(() => {
    // load username if exists
    return localStorage.getItem("userName") || "";
  });

  // run on initial omponent render
  useEffect(() => {
    if (userName) localStorage.setItem("userName", userName);
    // dependency array, reload comp when userName changes
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
