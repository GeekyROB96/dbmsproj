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

module.exports = {
    upload : upload
}