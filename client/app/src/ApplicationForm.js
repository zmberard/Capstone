import "./App.css";

function ApplicationForm() {
    return (
        <div className="ApplicationForm">
        
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
            <div id="message"></div>
            <div id="root">
                <div class="app">
                    <header class="app-header">
                        <h1>
                            "Computer Science Apps"
                            <br><small>Professional Program Application</small></br>
                        </h1>
                        <p>
                            "Logged in as"
                            "testcas"
                        </p>
                    </header>
                    <div class="application-form">
                        <div class="status-message pending">
                            Application Submitted Tue Oct 17 2023 18:15:41 GMT-0500 (Central Daylight Time)
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>


        </div>


    );
}