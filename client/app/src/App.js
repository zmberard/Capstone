import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './components/forms/ApplicationForm.js';
import ProfilesForm from './components/forms/ProfilesForm.js';
import HomePage from './components/forms/HomePage.js';
import AdminForm from './components/forms/AdminForm.js';
import Header from './components/layout/Header.js';  
import Footer from './components/layout/Footer.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext.js'; 
import TicketForwarder from './untils/TicketForwarder.js';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute.js';
import ErrorPage from './components/common/ErrorPage.js';
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
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div> 
          <Footer/>
        </div>
      </Router>
    </UserProvider> 
  );
}

export default App;
