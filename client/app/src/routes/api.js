/*
Do not need this, keeping it for reference

function App(){
    return (
        // Define the Router and Routes
        <Router>
            <Route> exact path = "/" component = { RootIndex } </Route>
            <Route> exact path = "/apply" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-applications.json" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-application/:eid" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-application" component = { ApplyController } </Route>
            <Route> exact path = "/professional-program-application-DARSUpdatedAt/:eid" component = { ApplyController } </Route>

            <Route> exact path = "/send-email" component = { ApplyController } </Route>

            <Route> exact path = "/profile", component = { ProfilesController } </Route>
            <Route> exact path = "/profile/update" component = { ProfilesController } </Route>
            
            <Route> exact path = "/isdisabled.json" component = { ApplyController} </Route>
            <Route> exact path = "/disable" component = { ApplyController } </Route>

            <Route> exact path = "/auth/login" component = { AuthController } </Route>
            <Route> exact path = "/auth/logout" component = { AuthController } </Route>
            <Route> exact path = "/auth/caslogout" component = { AuthController } </Route>
            <Route> exact path = "/auth/force" component = { AuthController } </Route>

            <Route> exact path = "/email-templates.json" component = { ApplyController } </Route>
            <Route> exact path = "/email-templates:id" component = { ApplyController } </Route>
            <Route> exact path = "/email-templates" component = { ApplyController } </Route>

            <Route> exact path = "/sentmails:eid" component = { ApplyController } </Route>
        </Router>
    );
}

export default App;
*/