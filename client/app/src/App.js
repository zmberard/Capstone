import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './ApplicationForm.js';
import ProfilesForm from './ProfilesForm.js';
import HomePage from './HomePage.js';
import AdminForm from './AdminForm.js';
import Header from './Header';  
import Footer from './Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './UserContext'; 
import TicketForwarder from './TicketForwarder';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="appContainer"> 
          <Header/>
          <div className="contentBackground">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Home" element={<HomePage />} />
              <Route path="/Apply" element={<ApplicationForm />} />
              <Route path="/Profile" element={<ProfilesForm />} />
              <Route path="/AdminPage" element={
                <ProtectedAdminRoute>
                  <AdminForm />
                </ProtectedAdminRoute>
              } />
              <Route path="/api/ticket" element={<TicketForwarder />} />
            </Routes>
          </div> 
          <Footer/>
        </div>
      </Router>
    </UserProvider> 
  );
}

export default App;
