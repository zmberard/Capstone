// Knex config file
// Copyright 2023 under MIT License

const environment = process.env.ENVIRONMENT || 'development'
const config = require('knexfile.js')[environment];
module.exports = require('knex')(config);