const models = require('../models');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res) {
    models.Doctor.findOne({ where: { DoctorEmail: req.body.DoctorEmail } }).then(
        result => {
            if (result) {
                res.status(409).json({
                    message: "Doctor Email Already Exists"
                });
            } else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.DoctorPassword, salt, function (err, hash) {
                        const doctor = {
                            DoctorName: req.body.DoctorName,
                            Availability: req.body.Availability,
                            Specialization: req.body.Specialization,
                            ContactNo: req.body.ContactNo,
                            DoctorEmail: req.body.DoctorEmail,
                            DoctorPassword: hash
                        };

                        models.Doctor.create(doctor)
                            .then(result => {
                                res.status(201).json({
                                    message: "Doctor Created Successfully!",
                                    doctor: result
                                });
                            })
                            .catch(error => {
                                console.error('Error Creating Doctor:', error.message);
                                res.status(500).json({
                                    message: "Error Creating Doctor",
                                    error: error
                                });
                            });
                    });
                });
            }
        }
    );
}

function login(req, res) {
    const schema = {
        DoctorEmail: { type: 'email' },
        DoctorPassword: { type: 'string', min: 8, max: 255 },
    };

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
          
        });
    }

    models.Doctor.findOne({ where: { DoctorEmail: req.body.DoctorEmail } }).then(
        doctor => {
            console.log('Found Doctor:', doctor); // Add this line for debugging

            if (!doctor) {
                console.log('Doctor not found'); // Add this line for debugging
                res.status(401).json({
                    message: "Invalid Credentials!"
                });
            } else {
                bcryptjs.compare(req.body.DoctorPassword, doctor.DoctorPassword, function (err, result) {
                    if (result) {
                        console.log('Password is correct'); // Add this line for debugging
                        const token = jwt.sign({
                            DoctorEmail: doctor.DoctorEmail,
                            id: doctor.id
                        }, 'secret', function (err, token) {
                            res.status(200).json({
                                message: "Authentication Successful!",
                                token: token,
                                doctor:doctor
                            });
                        });
                    } else {
                        console.log('Password is incorrect'); // Add this line for debugging
                        res.status(401).json({
                            message: "Invalid Credentials!"
                        });
                    }
                });
            }
        }).catch(err => {
            console.error('Error finding doctor:', err); // Add this line for debugging
            res.status(500).json({
                message: "Something Went Wrong!"
            });
        });
}

function show(req, res) {
    const id = req.params.id;

    models.Doctor.findByPk(id).then(
        result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Can't find Doctor"
                });
            }
        }
    ).catch(error => {
        res.status(500).json({
            message: "Something went Wrong!"
        });
    });
}

function index(req, res) {
    models.Doctor.findAll().then((result) => {
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "No Doctors found"
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
    const id = req.params.id;

    const updatedDoctor = {
        DoctorName: req.body.DoctorName,
        Availability: req.body.Availability,
        Specialization: req.body.Specialization,
        ContactNo: req.body.ContactNo,
        DoctorPassword: req.body.DoctorPassword,
    };

    const schema = {
        DoctorName: { type: 'string', min: 3, max: 255 },
        Availability: { type: 'string', min: 3, max: 255 },
        Specialization: { type: 'string', min: 3, max: 255 },
        ContactNo: { type: 'string', min: 10, max: 10 },
        DoctorPassword: { type: 'string', min: 8, max: 255 },
    };

    const v = new Validator();

    const validationResponse = v.validate(updatedDoctor, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Doctor.update(updatedDoctor, { where: { id: id } }).then(
        result => {
            if (result[0] > 0) {
                res.status(200).json({
                    message: "Doctor Details Updated Successfully!",
                    doctor: updatedDoctor
                });
            } else {
                res.status(404).json({
                    message: "Doctor not found or no changes made"
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

    models.Doctor.destroy({ where: { id: id } }).then(
        result => {
            if (result > 0) {
                res.status(200).json({
                    message: "Doctor Deleted Successfully!",
                    doctor: result
                });
            } else {
                res.status(404).json({
                    message: "Doctor not found"
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

module.exports = {
    signUp: signUp,
    show: show,
    index: index,
    update: update,
    login: login,
    destroy: destroy
};
