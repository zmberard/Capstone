// Nabbed from https://github.com/zombiepaladin/react-cas-example
const express = require('express');
const axios = require('axios');

// The serviceHost (our server) and casHost (the CAS server)
// hostnames, we nee to build urls.  Since we pass our serviceHost
// as a url component in the search string, we need to url-encode it.
var serviceHost = encodeURIComponent('http://localhost:3000/api/');
var casHost = 'http://localhost:4050/'//'https://signin.k-state.edu/WebISO/';


// Create an express router to handle requests
const router = express.Router();
// And export it from this module
module.exports = router;

// Process incoming login request by sending the user to the CAS server
router.get('/login', (req, res) => {
  res.redirect(`${casHost}login?service=${serviceHost}ticket`)
});

// Process incoming logout request 
router.get('/logout', (req, res) => {
  // Destroy the session with this app
  req.session.destroy();
  // Also redirect to CAS server logout to end its session
  res.redirect(`${casHost}logout`);
})

// Validate redirected login requests coming from the CAS server
router.get('/ticket', async (req, res) => {
  // get the ticket from the querystring
  const ticket = req.query.ticket;
  // We need to verify this ticket with the CAS server,
  // by making a request against its serviceValidate url
  var url = `${casHost}serviceValidate?ticket=${ticket}&service=${serviceHost}ticket`;
  // We'll use the fetch api to talk to the CAS server.  This can throw errors, so
  // we'll wrap it in a try-catch
  try {
    // We'll make an asynchronous request, so we await the response
    const response = await axios.get(url);
    // Then look for a username in the response using a regular expression
    // The response should be the XML specified by the standard.  We could
    // parse it as XML, but we only care about one element (`<cas:user>`),
    // so a regular expression has less overhead.
    var match = /<cas:user>\s*(\S+)\s*<\/cas:user>/.exec(response.data);
    // If it was found, we know the ticket was validated and we can log the user in
    // Otherwise, respond with an unauthorized response
    if(match) {
      // The username should be the first capture group, so store it in our session
      req.session.username = match[1];
      // Then redirect them to the landing page 
      console.log("Logged in successfully!")
      res.redirect('/')
    } else {
      res.status(403).send('Authorization failed');
    }
  } catch (err) {
    // If we caught an error, log it to the console
    console.error(err);
    // and send a 500 status code 
    res.status(500).send('Sorry. Something went wrong.')
  }
});

module.exports = router;