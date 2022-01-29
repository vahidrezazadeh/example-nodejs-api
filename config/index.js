const database = require('./database');

module.exports = {
  database,
  port: process.env.APP_PORT,
};
