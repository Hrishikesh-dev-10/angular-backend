const knex = require('knex');
const knexfile = require('./knexfile')

const db_connection = knex(knexfile.development); //connection of knex library with Config file to create conenction

module.exports = db_connection;