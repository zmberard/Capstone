// Nabbed from https://github.com/zombiepaladin/react-cas-example
const express = require('express');
const axios = require('axios'); 
const router = express.Router();

// The serviceHost (our server) and casHost (the CAS server)
// hostnames, we nee to build urls.  Since we pass our serviceHost
// as a url component in the search string, we need to url-encode it. 
var serviceHost = encodeURIComponent(process.env.API_URL + '/api/');
var casHost = 'https://signin.k-state.edu/WebISO/'//'https://signin.k-state.edu/WebISO/';
 
// Process incoming login request by sending the user to the CAS server
router.get('/login', (req, res) => {
  const returnUrl = req.query.returnUrl || '/';
  console.log("User is logging in!");
  req.session.returnUrl = returnUrl;
  console.log("SessionID: " + req.sessionID);
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
  console.log("Server got ticket!");
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
      const returnUrl = req.session.returnUrl;
      console.log("Current session data:", req.session); 
      console.log("Logged in successfully, redirecting to: ", returnUrl);
      res.json({success: true, redirectUrl: returnUrl, EId: req.session.username});
    } else {
      res.json({success: false, message: 'Happy little accident' + match + '\n' + response.data});
    }
  } catch (err) {
    // If we caught an error, log it to the console
    console.error(err);
    // and send a 500 status code 
    res.status(500).send('Sorry. Something went wrong.')
  }
});

module.exports = router;