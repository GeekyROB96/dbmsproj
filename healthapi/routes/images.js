const express =    require('express');

const imageController = require('../controllers/image.controller');
const imageUploader = require('../helpers/image-uploader');
const checkAuth = require('../middleware/check-auth');



const router = express.Router();

router.post('/uploads',checkAuth.checkAuth,imageUploader.uploads.single('image'),imageController.upload);


module.exports = router;