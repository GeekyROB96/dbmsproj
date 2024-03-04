const models = require('../models');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUpSchema = {
    PatientName: { type: 'string', min: 1, max: 255 },
    // PatientDOB: { type: 'date' },
    Address: { type: 'string', min: 1, max: 255 },
   // ContactNo: { type: 'number' },
    PatientEmail: { type: 'email' },
    PatientPassword: { type: 'string', min: 6, max: 255 }
};  

// Create a validator instance
const validator = new Validator();

// Create a validation function
const validateSignUp = (data) => {
    const validationResult = validator.validate(data, signUpSchema);
    return validationResult;
};

// Modify your signUp function
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




    // if (req.body["ContactNo"].toString().length !== 10) {
    //     return res.status(400).json({
    //         message: "Contact Number must be of 10 digits"
    //     });
    // }
    models.Patient.findOne({ where: { PatientEmail: req.body.PatientEmail } })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Patient Email Already Exists"
                });
            } else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.PatientPassword, salt, function (err, hash) {

                        const patient = {
                            PatientName: req.body.PatientName,
                            PatientDOB: new Date(req.body.PatientDOB),
                            Address: req.body.Address,
                            ContactNo: req.body.ContactNo,
                            PatientEmail: req.body.PatientEmail,
                            PatientPassword: hash
                        };

                        console.log('check1!!!!');

                        models.Patient.create(patient)
                            .then(result => {
                                res.status(201).json({
                                    message: "Patient Created Successfully!",
                                    patient: result
                                
                                });
                            })
                            .catch(error => {
                                console.error('Error Creating Patient:', error.message);
                                res.status(500).json({
                                    message: "Error Creating Patient",
                                    error: error
                                });
                            });

                    });
                });
            }
        })
        .catch(error => {
            console.error('Error checking Patient Email:', error.message);
            res.status(500).json({
                message: "Error checking Patient Email",
                error: error
            });
        });
}




function login(req, res) {
    const schema = {
        PatientEmail: { type: 'email' },
        PatientPassword: { type: 'string', min: 8, max: 255 },
    };

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Patient.findOne({ where: { PatientEmail: req.body.PatientEmail } }).then(
        patient => {
            if (patient == null) {
                res.status(401).json({
                    message: "Invalid Credentials!"
                });
            } else {
                bcryptjs.compare(req.body.PatientPassword, patient.PatientPassword, function (err, result) {
                    if (result) {
                        const token = jwt.sign({
                            PatientEmail: patient.PatientEmail,
                            id: patient.id
                        }, 'secret', function (err, token) {

                            res.status(200).json({
                                message: "Authentication Successful!",
                                token: token,
                                patient: patient
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


function show(req,res){

    const id = req.params.id ;

    models.Patient.findByPk(id).then(
        result =>{
            if(result){
                res.status(200).json(result);

            }else{
                res.status(404).json({
                    message : "Cant find Patient"
                })
        
            }

        }
    ).catch(error =>{
        res.status(500).json({
            message : "Something went Wrong!"
        })


    });

}

function index(req, res) {
    models.Patient.findAll().then((result) => {
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "No Patients found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something Went Wrong!",
            error: error
        });
    });
}


function update(req, res) {
    console.log('Received Request Body:', req.body);
    const id = req.params.id;

    // Exclude PatientEmail from the updatedPatient object
    const updatedPatient = {
        PatientName: req.body.PatientName,
        PatientDOB: new Date(req.body.PatientDOB),
        Address: req.body.Address,
        ContactNo: req.body.ContactNo,
        // PatientEmail is excluded
        PatientPassword: req.body.PatientPassword,
    };

    const PatientId = id; // Assuming this is your primary key column

    const schema = {
        PatientName: { type: 'string', min: 3, max: 255 },
        PatientDOB: { type: 'date' },
        Address: { type: 'string', min: 3, max: 255 },
        ContactNo: { type: 'string', min: 10, max: 10 },
        PatientPassword: { type: 'string', min: 8, max: 255 },
    };

    const v = new Validator();

    const validationResponse = v.validate(updatedPatient, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Patient.update(updatedPatient, { where: { id: id } }).then(
        result => {
            if (result[0] > 0) {
                res.status(200).json({
                    message: "Patient Details Updated Successfully!",
                    patient: updatedPatient
                });
            } else {
                res.status(404).json({
                    message: "Patient not found or no changes made"
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Uh Oh! Something Went Wrong!",
                error: error
            });
        });
}


function destroy(req, res) {

    const id = req.params.id;
   // const PatientId = 2;

    models.Patient.destroy({ where: { id: id } }).then(
        result => {
            if (result > 0) {
                res.status(200).json({
                    message: "Patient Deleted Successfully!",
                    patient: result
                });
            } else {
                res.status(404).json({
                    message: "Patient not found"
                });
            }
        }
    ).catch(error => {
        res.status(500).json({
            message: "Uh Oh! Something Went Wrong!",
            error: error
        });
    });
}

function logout(req, res) {
    // Simply respond with a success message for now
    res.status(200).json({
        message: "Logout successful",
    });
}


module.exports = {
    signUp:signUp,
   // save: save,
    show: show,
    index:index,
    update:update,
    login:login,
    destroy:destroy,
    logout:logout
};
