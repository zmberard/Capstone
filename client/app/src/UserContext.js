import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [WId, setUserID] = useState(null);

  const login = () => setUserID(88888888); // Mock login function
  const logout = () => setUserID(null); // Logout function

  return (
    <UserContext.Provider value={{ WId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
