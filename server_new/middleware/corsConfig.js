//TODO: implement Dynamic CORS origin handling

// Dynamic CORS origin handling middleware
//cors was added because I was having trouble with connecting to client 
//But the problem was not cors rather port visibility
//this should be implemented for prod  

const cors = require('cors');

const corsOptionsDelegate = (req, callback) => {
  const allowedOrigins = ['https://scaling-pancake-wqrgqgprw57hv47w-3000.app.github.dev'];
  let corsOptions;
  if (!req.header('Origin') || allowedOrigins.includes(req.header('Origin'))) {
    console.log('CORS allowed for:', req.header('Origin'));
    corsOptions = { origin: true };
  } else {
    console.log('CORS denied for:', req.header('Origin'));
    corsOptions = { origin: false }; 
  }
  callback(null, corsOptions); 
};

module.exports = cors(corsOptionsDelegate);