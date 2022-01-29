const express = require('express');

const appExpress = express();

const http = require('http');

const bodyParser = require('body-parser');

const validator = require('express-validator');

const mongoose = require('mongoose');

const router = require('./routes');

const fileUpload = require('express-fileupload');
const logMiddleware = require('./middlewares/logMiddleware');

module.exports = class Application {
  constructor() {
    this.setupExpress();

    this.setupDB();

    this.setConfig();

    this.setRoutes();
  }
  setupExpress() {
    const server = http.createServer(appExpress);

    server.listen(config.port, () => {
      console.log(`Server Run on Port :  ${config.port}`);
    });
  }
  setConfig() {
    appExpress.use(express.static('public'));

    appExpress.use(bodyParser.json());

    appExpress.use(bodyParser.urlencoded({ extended: true }));

    appExpress.use(logMiddleware.handle);

    // appExpress.use(validator());

    appExpress.use(
      fileUpload({
        limits: { fileSize: 1024 * 1024 * 2 },
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      }),
    );
  }

  setupDB() {
    mongoose.Promise = global.Promise;

    mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }
  setRoutes() {
    appExpress.use(router);
  }
};
