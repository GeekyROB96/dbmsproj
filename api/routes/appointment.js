const express = require('express');
const appointmentcontroller = require('../controllers/appointment.controller');


const checkAuthMiddleWare = require('../middleware/check-auth');
const router = express.Router();

// router.post('/', patientController.save);
router.post('/', appointmentcontroller.saveAppointment);
router.get('/appointment/all', appointmentcontroller.getAllAppointments);
router.get('/appointment/:id', appointmentcontroller.getAppointmentById);
router.get('/appointment/patient/:PatientId', appointmentcontroller.getAppointmentsByPatientId);
router.patch('/appointment/:id', appointmentcontroller.updateAppointmentDateTime);
router.delete('/appointment/:id', appointmentcontroller.deleteAppointment);





module.exports = router;