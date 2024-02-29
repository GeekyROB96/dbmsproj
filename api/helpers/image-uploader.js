const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        // Use the image name from the request body or keep the original name
        const imageName = req.params.imageName || new Date().getTime();
       // cb(null, imageName +"patient"+ path.extname(file.originalname));
       cb(null, imageName + path.extname(file.originalname));

    },
});

const filefilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(new Error("Unsuported Files"),false);
    }
}

const uploads = multer({
    storage:storage,
    limits : { 
        fileSize: 1024*1024*10
    },
    fileFilter: filefilter
});


module.exports ={
    uploads: uploads
};