import React, { createContext, useContext, useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [EId, setEId] = useState(() => JSON.parse(localStorage.getItem('EId')) || null); //EId is only used for fetchUserDetails in TicketForwarder
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : {
      wid: '',
      first_name: '',
      last_name: '',
      email: '',
      advisor: '',
      isAdmin: false,
    };
  });
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const fetchUserDetails = async (eid) => {
    setLoading(true);
    try {
      console.log("Initiating fetch for user details with EId: ", eid); // Log at start
      const response = await fetch(`http://localhost:3002/api/getUserDetail?id=${eid}`);
      const data = await response.json();
      console.log("User details fetched: ", data); // Log fetched data
  
      const profileData = data[0]; //API returns an array
      setUserData({
        wid: profileData.wid || "000000000",
        first_name: profileData.first_name || "No first name",
        last_name: profileData.last_name || "No last name",
        email: profileData.email || "No email",
        advisor: profileData.advisor || "No advisor",  
        isAdmin: profileData.admin || false,
      });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    const currentUrl = window.location.pathname;
    window.location.href = `http://localhost:3002/api/login?returnUrl=${encodeURIComponent(currentUrl)}`;
    console.log(window.location.href); //Authentication is checked using wid, was not able to figureout why setting Eid keeps causing error for fetchUserDetails. See Header and ProfileFrom use of wid. 
  } 
  const logout = () => {
    localStorage.removeItem('EId');
    setEId(null);
    localStorage.removeItem('userData');
    setUserData({ wid: '', first_name: '', last_name: '', email: '', advisor: '', isAdmin: false });
    window.location.reload(); 
  };

  return (
    <UserContext.Provider value={{ EId, userData, login, logout, fetchUserDetails, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);  