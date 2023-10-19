import "./App.css";

function ProfilesForm() {
    return (
        <div className="ProfilesForm">
 <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed"
                    data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                    aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand"> CS Applications</a>

                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a>Apply</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a>testcas</a>
                        </li>
                        <li>
                            <p class="navbar-btn">
                                <a class="bts btn-success">Logout</a>
                            </p>
                        </li>
                    </ul>
                </div>
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
