const express = require('express');
const router = express.Router();

const UploadController = require('../../controllers/UploadController');
const HomeController = require('./../../controllers/HomeController');

router.get('/say-hello', HomeController.index);
router.get('/about-us', HomeController.index);
router.post('/upload', UploadController.index);

module.exports = router;
