const app = require('./app/index');

require('dotenv').config();

global.config = require('./config');

new app();
