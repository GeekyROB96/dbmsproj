const express =    require('express');

const imageController = require('../controllers/image.controller');
const imageUploader = require('../helpers/image-uploader');



const router = express.Router();

router.post('/uploads/:imageName',imageUploader.uploads.single('image'),imageController.upload);

router.get('/getImages/:names', imageController.getImages);  // New route for getting images

module.exports = router;