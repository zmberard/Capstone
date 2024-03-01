//TODO: add vars such as name, email, advisor, after login
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [WId, setUserID] = useState(() => JSON.parse(localStorage.getItem('WId')) || null);

  const login = () => {
    const mockUserId = 88888888;
    localStorage.setItem('WId', JSON.stringify(mockUserId));
    setUserID(mockUserId);
  };
  const logout = () => {
    localStorage.removeItem('WId');
    setUserID(null);
  };

  return (
    <UserContext.Provider value={{ WId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
