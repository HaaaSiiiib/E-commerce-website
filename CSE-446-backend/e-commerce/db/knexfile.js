require('dotenv').config({path:'../.env'});
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: process.env.DB,
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      timezone: 'UTC'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: true,
    ...knexSnakeCaseMappers()
  },

  production: {
    client: process.env.DB,
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      timezone: 'UTC'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers()
  }

};
