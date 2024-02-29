const path = require('path');
const fs = require('fs');



function upload(req,res){

    if(req.file.filename){

    res.status(201).json({
        message: "Image Uploaded Successfully!",
        url: req.file
    });
    }else{
        res.status(500).json({
            message: "Error Uploading Image"
        });
    }


}

    function getImages(req, res) {
        const imageNames = req.params.names.split(',');
    
        const images = imageNames.map((imageName) => {
            const imagePath = path.join(__dirname, '../uploads', imageName);
            return {
                name: imageName,
                url: `/uploads/${imageName}`,
                exists: fs.existsSync(imagePath),
            };
        });
    
        res.status(200).json({
            message: "Images retrieved successfully!",
            images: images,
        });
    }
    

// 
module.exports = {
    upload : upload,
    getImages:getImages
};

//function getimages(req, res) {
    //     const filePath = './uploads/' + req.file.filename;
        
    //     res.sendFile(filePath, (err) => {
    //         if (err) {
    //             res.status(500).json({
    //                 message: "Error Sending Image",
    //                 error: err
    //             });
    //         }
    //     });
    // }
    