const jwt = require('jsonwebtoken');


function checkAuth(req, res, next) {

    try{
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token,'secret');

        // req.patientData = decodedToken;
        req.userData = decodedToken;
        next();

    }
    catch(e){
        
        return res.status(401).json({message: 'Authentication failed'});  //Unauthorized request

    }
}

module.exports = {
    checkAuth : checkAuth
}