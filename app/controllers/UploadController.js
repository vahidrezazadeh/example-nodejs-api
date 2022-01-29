const path = require('path');
const uniqid = require('uniqid');
const fileUpload = require('../models/fileUpload');
const _ = require('lodash');

class UploadController {
  async index(req, res) {
    const validExtension = ['.png', '.jpg', '.mp3'];
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No File were uploaded.');
    }
    let file = req.files.file;
    var extension = path.extname(file.name).toLowerCase();
    if (
      _.find(validExtension, (x) => {
        return x == extension;
      }) == undefined
    ) {
      return res.status(400).send('invalid extension');
    }

    const urlPath = `storage/uploads/${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()}/${uniqid.time()}-${
      file.name
    }`;

    const destination = `./../../${urlPath}`;
    const filePath = path.join(__dirname, destination);

    const fileUploadResult = await new Promise((resolve, reject) => {
      file.mv(filePath, async (err) => {
        if (err) {
          // TODO ADD TO Crash File.
          console.log(err);
          resolve(false);
        }
        resolve(true);
      });
    });
    if (fileUploadResult) {
      const model = new fileUpload({
        title: file.name,
        url: urlPath,
      });
      await model.save();
      return res.json({
        file: model,
      });
    }
    return res.status(500).json('error in upload file');
  }
}

module.exports = new UploadController();
