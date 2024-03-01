require('dotenv').config();

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
      ssl: {
        rejectUnauthorized: false, 
      }
    },
  },
  // add more environments (e.g., test and production) as needed
};

const serverConfig = {
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
};

module.exports = { knexConfig, serverConfig };