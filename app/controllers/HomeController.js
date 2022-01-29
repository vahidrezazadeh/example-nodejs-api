const Controller = require('./Controller');
const FileUpload = require('./../models/fileUpload');

class HomeController extends Controller {
  async index(req, res) {
    res.json('Hello User');
  }
  async about(req, res) {
    res.json('This is About Us');
  }
}

module.exports = new HomeController();
