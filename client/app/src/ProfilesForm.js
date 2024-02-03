import "./App.css";
import React from 'react'; 

function ProfilesForm() {
    return (
        <div className="ProfilesForm"> 
        <div class="container" role="main">
            <div id="message"> </div>
            <h3 style={{ marginLeft: '150px', marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} class="top-header">Update your user profile:</h3>
            
            <form>
            <div class="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label style={{ fontWeight: 'bold', marginLeft: '150px', marginBottom: '5px' }} class="control-label" for="first_name">First Name</label>
                    <div></div>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="first_name" 
                        aria-describedby="firstnamehelp" 
                        value="Test"
                        style={{ width: 'calc(100% - 350px)', minWidth: '200px', marginLeft: '150px' }}
                    />
                    <span id="first_namehelp" class="help-block"></span>
                </div>
                <div class="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label style={{ fontWeight: 'bold', marginLeft: '150px', marginTop: '5px', marginBottom: '5px' }} class="control-label" for="last_name">Last Name</label>
                    <div></div>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="last_name" 
                    aria-describedby="lastnamehelp" 
                    value="User"
                    style={{ width: 'calc(100% - 350px)', minWidth: '200px', marginLeft: '150px' }}
                />
                    <span id="last_namehelp" class="help-block"></span>
                </div>
            
                <span id="profileSpin" class=" fa fa-cog fa-spin fa-lg hide-spin"></span>
                <button style={{ marginLeft: '150px', marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '15px' }} type ="button" class="btn btn-primary" id="saveProfile">Update Profile</button>
            
                <br></br>
                <br></br>
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h4 style={{ marginLeft: '150px', marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} class="panel-title">Contact your advisor or department to update these items if they are incorrect</h4>
                    </div>
                    <div style={{ width: 'calc(100% - 350px)', minWidth: '200px', marginLeft: '150px' }} class="panel-body">
                        <div class="form-group">
                            <label style={{ fontWeight: 'bold', marginLeft: '150px', marginBottom: '5px' }} class="control-label" for="email">Email Address</label>
                            <div></div>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="email" 
                            aria-describedby="emailhelp" 
                            disabled value="testcas@ksu.edu"
                            style={{ width: 'calc(100% - 350px)', minWidth: '200px', marginLeft: '150px' }}
                            />
                            <span id="emailhelp" class="help-block"></span>
                        </div>
                        <div class="form-group">
                            <label style={{ fontWeight: 'bold', marginLeft: '150px', marginBottom: '5px' }} class="control-label" for="wid">Wildcat ID</label>
                            <div></div>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="wid" 
                            aria-describedby="emailhelp" 
                            disabled value="000000000"
                            style={{ width: 'calc(100% - 350px)', minWidth: '200px', marginLeft: '150px' }}
                            />
                            <span id="widhelp" class="help-block"></span>
                        </div>
                    </div>
                </div>
            </form>
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
