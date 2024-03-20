const express = require('express');
const cors = require('cors');
const { serverConfig } = require('./configs/config');
const { knexConfig } = require('./configs/config');
const knex = require('knex')(knexConfig.development);

const app = express();
const PORT = serverConfig.port || 3001;

app.use(express.json());

// Middleware
const corsConfig = require('./middleware/corsConfig');
app.use(corsConfig);

// Routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const dataRoutes = require('./routes/dataRoutes');
const auth = require('./routes/auth');

app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', applicationRoutes);
app.use('/api', dataRoutes);

// Since all our rotes are served with the `/api` prefix,
// we might as well set up a subrouter using it:
const router = express.Router();
app.use('/api', router);

// Use CAS-based authentication to log users in
router.use(auth);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});