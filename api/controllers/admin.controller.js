const models = require('../models');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



const signUpSchema = {
    name: { type: 'string', min: 1, max: 255 },
    password: { type: 'string', min: 1, max: 255 },
    email: { type: 'email' },
    ContactNo: { type: 'string', min: 6, max: 255 }
};  

// Create a validator instance
const validator = new Validator();

// Create a validation function
const validateSignUp = (data) => {
    const validationResult = validator.validate(data, signUpSchema);
    return validationResult;
};



function signUp(req, res) {
    console.log('test1');
    console.log("input", req.body);

    // Validate the input data
    const validationErrors = validateSignUp(req.body);

    if (validationErrors !== true) {
        return res.status(400).json({
            message: 'Validation error',
            errors: validationErrors
        });
    }




    models.Admin.findOne({ where: { email: req.body.email } })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Admin Email Already Exists"
                });
            } else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.password, salt, function (err, hash) {

                        const admin = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            ContactNo: req.body.ContactNo,
                        };

                        console.log('check1!!!!');

                        models.Admin.create(admin)
                            .then(result => {
                                res.status(201).json({
                                    message: "Admin Created Successfully!",
                                    admin: result
                                
                                });
                            })
                            .catch(error => {
                                console.error('Error Creating Admin:', error.message);
                                res.status(500).json({
                                    message: "Error Creating Admin",
                                    error: error
                                });
                            });

                    });
                });
            }
        })
        .catch(error => {
            console.error('Error checking Admin Email:', error.message);
            res.status(500).json({
                message: "Error checking Admin Email",
                error: error
            });
        });
}





function login(req, res) {
    const schema = {
        email: { type: 'email' },
        password: { type: 'string', min: 8, max: 255 },
    };

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Admin.findOne({ where: { email: req.body.email } }).then(
        admin => {
            if (admin == null) {
                res.status(401).json({
                    message: "Invalid Credentials!"
                });
            } else {
                bcryptjs.compare(req.body.password, admin.password, function (err, result) {
                    if (result) {
                        const token = jwt.sign({
                            email: admin.email,
                            id: admin.id
                        }, 'secret', function (err, token) {

                            res.status(200).json({
                                message: "Authentication Successful!",
                                token: token,
                                admin: admin
                            });

                        });
                    } else {
                        res.status(401).json({
                            message: "Invalid Credentials!"
                        });
                    }
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: "Something Went Wrong!"
            });
        });
}




module.exports = {

    signUp: signUp,
    login: login,
}