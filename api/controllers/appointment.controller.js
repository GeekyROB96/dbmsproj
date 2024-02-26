const models = require('../models');
const Validator = require("fastest-validator");
const sequelize = require('sequelize');

function saveAppointment(req, res) {
    const appointment = {
        AppointmentId: req.body.AppointmentId,
        PatientId: req.body.PatientId,
        AppointmentDate: new Date(req.body.AppointmentDate),
        Symptoms: req.body.Symptoms,
        AppointmentTime: req.body.AppointmentTime,
        Remarks: req.body.Remarks,
    };

        const schema = {
            AppointmentId: { type: 'number' },
            PatientId: { type: 'number' },
            AppointmentDate: { type: 'date' },
            Symptoms: { type: 'string', min: 3, max: 255 },
            AppointmentTime: { type: 'string' },
            Remarks: { type: 'string', min: 3, max: 255 },
        };
        
    const v = new Validator();

    const validationResponse = v.validate(appointment, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Appointment.create(appointment)
        .then(result => {
            res.status(201).json({
                message: "Appointment Created Successfully!",
                appointment: result
            });
        })
        .catch(error => {
            console.error('Error Creating Appointment:', error.message);
            res.status(500).json({
                message: "Error Creating Appointment",
                error: error
            });
        });
}
function getAppointmentsByPatientId(req, res) {
    const PatientId = req.params.PatientId;

    models.Appointment.findAll({ where: { PatientId: PatientId } })
        .then(appointments => {
            if (!appointments) {
                res.status(404).json({ message: 'Appointments not found for the patient' });
                return;
            }

            res.status(200).json(appointments);
        })
        .catch(error => {
            console.error('Error getting appointments by PatientId:', error.message);
            res.status(500).json({ message: 'Something went wrong', error: error });
        });
}

function getAppointmentById(req, res) {
    const id = req.params.id;

    models.Appointment.findByPk(id)
        .then(appointment => {
            if (!appointment) {
                res.status(404).json({ message: 'Appointment not found' });
                return;
            }

            res.status(200).json(appointment);
        })
        .catch(error => {
            console.error('Error getting appointment by id:', error.message);
            res.status(500).json({ message: 'Something went wrong', error: error });
        });
}

function getAllAppointments(req, res) {
    models.Appointment.findAll(
    )
        .then(appointments => {
            res.status(200).json({
                appointments: appointments
            });
        })
        .catch(error => {
            console.error('Error Retrieving Appointments:', error.message);
            res.status(500).json({
                message: "Error Retrieving Appointments",
                error: error
            });
        });
}


function updateAppointmentDateTime(req, res) {
    const id = req.params.id;

    const updatedAppointment = {
        AppointmentDate: new Date(req.body.AppointmentDate),
        AppointmentTime: req.body.AppointmentTime,
        Symptoms: req.body.Symptoms,
        // Add other fields as needed
    };

    const schema = {
        AppointmentDate: { type: 'date' },
        AppointmentTime: { type: 'string' },
        Symptoms: { type: 'string', min: 3, max: 255 }, // Adjust as needed
        // Add validation for other fields
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedAppointment, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse,
        });
    }

    models.Appointment.update(updatedAppointment, { where: { id: id } })
        .then((result) => {
            if (result[0] > 0) {
                res.status(200).json({
                    message: "Appointment updated successfully!",
                    appointment: updatedAppointment,
                });
            } else {
                res.status(404).json({
                    message: "Appointment not found or no changes made",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Uh Oh! Something Went Wrong!",
                error: error,
            });
        });
}


function deleteAppointment(req, res) {
    const id = req.params.id;

    models.Appointment.findByPk(id)
        .then(appointment => {
            if (!appointment) {
                res.status(404).json({ message: 'Appointment not found' });
                return;
            }

            // Delete the appointment
            return appointment.destroy();
        })
        .then(() => {
            res.status(200).json({
                message: "Appointment deleted successfully!",
            });
        })
        .catch(error => {
            console.error('Error deleting appointment:', error.message);
            res.status(500).json({ message: 'Something went wrong', error: error });
        });
}


module.exports = {
    saveAppointment: saveAppointment,
    getAppointmentsByPatientId:getAppointmentsByPatientId,
    getAppointmentById:getAppointmentById,
    updateAppointmentDateTime: updateAppointmentDateTime,
    deleteAppointment:deleteAppointment,
    getAllAppointments:getAllAppointments,
};
