import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationForm from '/workspaces/Capstone/client/app/src/ApplicationForm.js';
import ProfilesForm from '/workspaces/Capstone/client/app/src/ProfilesForm.js';
import Header from './Header'; // Make sure to import the Header component

function HomePage() {
  return (
    <div>
      
      <ul>
          <li><Link to="/Home">CS Applications</Link></li>
          <li><Link to="/Apply">Apply</Link></li>
          <li><Link to="/Profile">Profile</Link></li>
        </ul>

        <div className="container">
          <div className="jumbotron">
            <h1>CS Applications</h1>
            <p>Welcome to the CS Applications System</p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Requirements</h2>
              <p>In order to be considered for admission to the professional program, a student must have:</p>
              <ol className="customIndent">
                <li>Passed all pre-professional program courses with a C or better</li>
                <li>Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
              </ol>
            </div>
            <div className="col-md-6">
              <h2>Apply</h2>
              <p>When you are ready to apply, click here!</p>
              <Link to="/Apply" className="button">Apply!</Link>
            </div>
          </div>
        </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Apply" element={<ApplicationForm />} />
          <Route path="/Profile" element={<ProfilesForm />} />
          <Route path=""></Route>
        </Routes>
      
         
      <ul>
        <li><Link to="/Home">CS Applications</Link></li>
        <li><Link to="/Apply">Apply</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
      </ul>
    
        <div className="container">
          <div className="jumbotron">
            <h1>CS Applications</h1>
            <p>Welcome to the CS Applications System</p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Requirements</h2>
              <p>In order to be considered for admission to the professional program, a student must have:</p>
              <ol className="customIndent">
                <li>Passed all pre-professional program courses with a C or better</li>
                <li>Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
              </ol>
            </div>
            <div className="col-md-6">
              <h2>Apply</h2>
              <p>When you are ready to apply, click here!</p>
              <Link to="/Apply" className="button">Apply!</Link>
            </div>
          </div>
        </div>
        </Router>
    </div>
  );
}

export default App;
