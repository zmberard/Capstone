// Nabbed from https://github.com/zombiepaladin/react-cas-example

const loginRequired = (req, res, next) => {
    // A logged-in user should have a username set in the session
    if(req.session && req.session.username) next();
    // If not, serve a 403 "not authorized" message.
    else res.status(403).send("You are not authorized to view this page.");
  }
  
  module.exports = loginRequired;