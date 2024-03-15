const express = require('express');
const cors = require('cors');
const { serverConfig } = require('./configs/config');
const { knexConfig } = require('./configs/config');
const knex = require('knex')(knexConfig.development);

const app = express();
const PORT = serverConfig.port || 3001;

app.use(express.json());

// Dynamic CORS origin handling
const allowedOrigins = ['https://ominous-chainsaw-q57p5pjvvvr29vxj-3000.app.github.dev'];
//cors was added because I was having trouble with connecting to client 
//But the problem was not cors rather port visibility
//this should be implemented for prod  
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//The plan as of now is to fetch all the userData when user first login then use userContext to populate fields
//The current implementation is fetching data on every page load. The implementation should be updated after login implementation

//TODO: Get first and last name and email for profile
//TODO: The end point should be changed to something like 'login' then use userContext to populate profile and application page
app.get('/api/getUserDetail', async (req, res) => {
  console.log('Profile endpoint hit');
  console.log('QUERY ID: ' + req.query.id);
  const id = req.query.id; 
  if (!id) {
      console.log('No WID provided!');
      return res.status(400).send('WID is required');
  }
  try {
    const data = await knex('users').select('wid', 'first_name', 'last_name', 'email', 'advisor').where('wid', id);
    const query = knex('users').select('wid', 'first_name', 'last_name', 'email', 'advisor').where('wid', id).toString();
    console.log(query);  
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/profile', async (req, res) => {
    console.log('Profile endpoint hit');
    console.log('QUERY ID: ' + req.query.id);
    const id = req.query.id; 
    if (!id) {
        console.log('No WID provided!');
        return res.status(400).send('WID is required');
    }
    try {
      const data = await knex('users').select('wid', 'first_name', 'last_name', 'email').where('wid', id);
      const query = knex('users').select('wid', 'first_name', 'last_name', 'email').where('wid', id).toString();
      console.log(query);  
      console.log(data);
      res.json(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/courses', async (req, res) => { 
    console.log('Courses endpoint hit');
    const id = req.query.id; 
    if (!id) {
      console.log('No WID provided!');
      return res.status(400).send('WID is required');
    }
    try {
      
      let courses = await knex('report')
        .select("class_subject", "class_catalog", "class_descr", "grade")
        .where('wid', id);
      
      // Set default status based on grade
      courses = courses.map(course => ({
        ...course,
        status: (course.grade && course.grade !== 'N/A') ? 'Complete' : 'In-Progress',   // might need status column in db table 
        grade: course.grade || 'N/A',
      }));
  
      const response = { 
        courses,
      };
  
      console.log(response);
      res.json(response);
    } catch (err) {
      console.error('Error fetching courses:', err);
      res.status(500).send('Server error');
    }
  });

app.get('/api/GETEVERYTHING', async (req, res) => { 
  try {
    const data = await knex.select('*').from('dars_data');
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server error');
  }
});
