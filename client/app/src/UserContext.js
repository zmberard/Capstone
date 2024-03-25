import React, { createContext, useContext, useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [EId, setEId] = useState(() => JSON.parse(localStorage.getItem('EId')) || null);
  const [userData, setUserData] = useState({
    wid: '',
    first_name: '',
    last_name: '',
    email: '',
    advisor: '',
  });

  useEffect(() => {
    if (EId) {
      // Fetch user details when EId is available
      fetchUserDetails(EId);
    }
  }, [EId]);

  const fetchUserDetails = async (eid) => {
    try {
      const response = await fetch(`http://localhost:3002/api/getUserDetail?id=${eid}`);
      const data = await response.json();
      const profileData = data[0]; //API returns an array
      console.log(data);
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

  // const login = () => {
  //   // const mockUserId = 8888888;
  //   // localStorage.setItem('WId', JSON.stringify(mockUserId));
  //   // setWId(mockUserId);
  //   // // Trigger fetching user details upon login
  //   // fetchUserDetails(mockUserId);
  //   const location = useLocation();
  //   const currentUrl = location.pathname;
  //   window.location.href = `http://localhost:3002/api/login?returnUrl=${encodeURIComponent(currentUrl)}`;
  //   console.log(currentUrl);
  //   console.log(window.location.href);
  // };

  const login = () => {
    const currentUrl = window.location.pathname;
    window.location.href = `http://localhost:3002/api/login?returnUrl=${encodeURIComponent(currentUrl)}`;
    console.log(window.location.href); 
  }

  const logout = () => {
    localStorage.removeItem('EId');
    setEId(null);
    setUserData({ wid: '', first_name: '', last_name: '', email: '', advisor: '' });
    //window.location.href = '/api/logout'
  };

  return (
    <UserContext.Provider value={{ EId, userData, login, logout, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// export function useLogin() {
//   const location = useLocation();
  
//   const login = () => {
//     console.log("window pathname" + window.location.pathname);
//     const currentUrl = location.pathname;
//     window.location.href = `http://localhost:3002/api/login?returnUrl=${encodeURIComponent(currentUrl)}`;
//     // Additional console logs for debugging
//     console.log(currentUrl);
//     console.log(window.location.href);
//   };

//   return login;
// }