import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [WId, setWId] = useState(() => JSON.parse(localStorage.getItem('WId')) || null);
  const [userData, setUserData] = useState({
    wid: '',
    first_name: '',
    last_name: '',
    email: '',
    advisor: '',
  });

  useEffect(() => {
    if (WId) {
      // Fetch user details when WId is available
      fetchUserDetails(WId);
    }
  }, [WId]);

  const fetchUserDetails = async (wid) => {
    try {
      const response = await fetch(`https://scaling-pancake-wqrgqgprw57hv47w-3002.app.github.dev/api/getUserDetail?id=${wid}`);
      const data = await response.json();
      const profileData = data[0]; //API returns an array
      setUserData({
        wid: profileData.wid || "000000000",
        first_name: profileData.first_name || "No first name",
        last_name: profileData.last_name || "No last name",
        email: profileData.email || "No email",
        advisor: profileData.advisor || "No advisor", 
      });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const login = () => {
    // const mockUserId = 8888888;
    // localStorage.setItem('WId', JSON.stringify(mockUserId));
    // setWId(mockUserId);
    // // Trigger fetching user details upon login
    // fetchUserDetails(mockUserId);
    window.location.href = 'https://scaling-pancake-wqrgqgprw57hv47w-3002.app.github.dev/api/login';
  };

  const logout = () => {
    localStorage.removeItem('WId');
    setWId(null);
    setUserData({ wid: '', first_name: '', last_name: '', email: '' });
    //window.location.href = '/api/logout'
  };

  return (
    <UserContext.Provider value={{ WId, userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);