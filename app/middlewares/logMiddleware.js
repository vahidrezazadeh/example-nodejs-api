const middleware = require('./middleware');

class LogMiddleware extends middleware {
  handle(req, res, next) {
    console.log('New Request : ', req.url);
    next();
  }
}

module.exports = new LogMiddleware();
