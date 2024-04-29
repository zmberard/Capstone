import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';  

const ProtectedAdminRoute = ({ children }) => {
  const { userData } = useUser();
 
  if (!userData.wid || !userData.isAdmin) { 
    return <h1>Access Denied</h1>; 
    // return <Navigate to="/" />;
  } 
  return children;
};

export default ProtectedAdminRoute;