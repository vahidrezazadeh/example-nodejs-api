const autoBind = require('auto-bind');

module.exports = class Middleware {
  constructor() {
    autoBind(this);
  }
};
