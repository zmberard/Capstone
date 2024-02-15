// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = { 
  development: {
    client: 'pg',
    connection: {
      host: '',  
      port:  5432,
      user: 'codespace_devuser', //
      password: '', //
      database: 'DARS_TEST',
      ssl: {
        rejectUnauthorized: false, 
      }
    },
  },

  testing: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      host:     "localhost",
      port:     5432,
      user:     'username',
      password: 'password'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      host:     "localhost",
      port:     5432,
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      host:     "localhost",
      port:     5432,
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
