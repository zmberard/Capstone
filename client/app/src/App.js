import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationForm from './ApplicationForm.js';
import ProfilesForm from './ProfilesForm.js';
import Header from './Header';  
import Footer from './Footer'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          {/* not sure why home is not needed here*/}
          <Route path="/Apply" element={<ApplicationForm />} />
          <Route path="/Profile" element={<ProfilesForm />} />
        </Routes>
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
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
