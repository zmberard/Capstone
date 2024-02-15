const express = require('express');
const { serverConfig } = require('./configs/config');
const cors = require('cors');

const { knexConfig } = require('./configs/config');
const knex = require('knex')(knexConfig.development);

const app = express();
const PORT = serverConfig.port || 3001;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
	origin: 'https://ominous-chainsaw-q57p5pjvvvr29vxj-3000.app.github.dev'
  }));
//replace '*' with specific origin

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});  

app.get('/api/profile', async (req, res) => {
	console.log('Profile endpoint hit');
	try {
	  const data = await knex.select('*').from('dars_data');
	  console.log(data);
	  res.json(data);
	} catch (err) {
	  console.error('Error fetching data:', err);
	  res.status(500).send('Server error');
	}
  });
  