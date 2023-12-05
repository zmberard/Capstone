import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import ApplicationForm from '/workspaces/Capstone/client/app/src/ApplicationForm.js';

function ProfilesForm() {
    return (
        <div className="ProfilesForm">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <ul>
                <li><Link to="/Home">CS Applications</Link></li>
                <li><Link to="/Apply">Apply</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                </ul>
                
            </div>
        </nav>
            
        <div class="container" role="main">
            <div id="message"> </div>
            <h3 class="top-header">Update your user profile:</h3>
            <form>
                <div class="form-group">
                    <label class="control-label" for="first_name">First Name</label>
                    <input type="text" class="form-control" id="first_name" aria-descibedby="firstnamehelp" value="Test"></input>
                    <span id="first_namehelp" class="help-block"></span>
                </div>
                <div class="form-group">
                    <label class="control-label" for="last_name">Last Name</label>
                    <input type="text" class="form-control" id="last_name" aria-descibedby="lastnamehelp" value="User"></input>
                    <span id="last_namehelp" class="help-block"></span>
                </div>
            </form>
            <span id="profileSpin" class=" fa fa-cog fa-spin fa-lg hide-spin">&nbsp</span>
            <button type ="button" class="btn btn-primary" id="saveProfile">Update Profile</button>
            <br></br>
            <br></br>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h4 class="panel-title">Contact your advisor or department to update these items if they are incorrect</h4>
                </div>
                <div class="panel-body">
                    <div class="form-group">
                        <label class="control-label" for="email"> Email Address</label>
                        <input type="text" class="form-control" id="email" aria-describedby="emailhelp" disabled value="testcas@ksu.edu"></input>
                        <span id="emailhelp" class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="wid">Wildcat ID</label>
                        <input type="text" class="form-control" id="wid" aria-describedby="emailhelp" disabled value="testcas@ksu.edu"></input>
                        <span id="widhelp" class="help-block"></span>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container">
                <p class="text-muted">CS Applications - Contact webmaster@cs.ksu.edu for help</p>
            </div>
        </footer>

        </div>

    );
}

export default ProfilesForm;
