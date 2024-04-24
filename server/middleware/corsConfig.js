//TODO: implement Dynamic CORS origin handling

// Dynamic CORS origin handling middleware
//cors was added because I was having trouble with connecting to client 
//But the problem was not cors rather port visibility
//this should be implemented for prod  

const cors = require('cors');

const corsOptionsDelegate = (req, callback) => { 
  const allowedOrigins = [process.env.API_URL];
  let corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true };  
  } else {
    corsOptions = { origin: false };  
  }
  callback(null, corsOptions); 
};

module.exports = cors(corsOptionsDelegate);