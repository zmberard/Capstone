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
      eid: '',
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
        eid: profileData.eid || "No EID Found",
      });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (eid, firstName, lastName) => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:3002/api/updateUserName?eid=${eid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName }),
        });
  
        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }
  
        await fetchUserDetails(eid);  
        alert('Profile updated successfully'); //TODO: Remov alerts
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
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
    setUserData({ wid: '', first_name: '', last_name: '', email: '', advisor: '', isAdmin: false, eid: '' });
    window.location.reload(); 
  }; 

  const [statusMessage, setStatusMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState('info'); 
  const updateUserMessage = (message, status) => { 
    setStatusMessage(message);
    setAlertStatus(status);
  };

  return (
    <UserContext.Provider value={{ EId, userData, setUserData, login, logout, fetchUserDetails, loading, handleUpdateProfile, statusMessage, alertStatus, updateUserMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);  