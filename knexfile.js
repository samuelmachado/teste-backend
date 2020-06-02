module.exports = {

    development: {
      client: 'pg',
      connection: {
          host: '127.0.0.1',
          user: 'postgres',
          password: 'test',
          database: 'allegra_db',
      },
      migrations: {
        directory: './src/database/migrations'
      },
    },
  
    staging: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  
  };
  