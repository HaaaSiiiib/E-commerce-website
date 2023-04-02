require('dotenv').config({ path: '../.env' });
const knex = require('knex');
const knexfile = require('./knexfile');

module.exports = knex(knexfile[process.env.DEV_MODE]);