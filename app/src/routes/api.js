// Tells the code that we want to use React to build our app's user interface.
import React from 'react';
// Imports the 'Router' and 'Route' components from React Router.
import { BrowserRouter as Router, Route } from react-router-dom;
// Brings in the code from RootIndex that's in the same directory as the file.
import RootIndex from './RootIndex';
// Brings in the code from ApplyController that's in the same directory as the file.
import ApplyController from './ApplyController';
// Brings in the code from AuthController that's in the same directory as the file.
import AuthController from './AuthController';
// Brings in the code from ProfilesController that's in the same directory as the file.
import ProfilesController from './ProfilesController'

//const app = express();

// The entry point of our React application
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