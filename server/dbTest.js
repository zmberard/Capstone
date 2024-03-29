const { knexConfig } = require('./configs/config');
const knex = require('knex')(knexConfig.development);

// Example query: Select all rows from a table
knex.select('*').from('dars_data')
  .then(data => {
    console.log('Query result:', data);
  })
  .catch(err => {
    console.error('Error executing query:', err);
  })
  .finally(() => {
    knex.destroy(); // Close the database connection
  });
