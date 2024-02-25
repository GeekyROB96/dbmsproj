const express = require('express');
const diagnosisreportcontroller = require('../controllers/diagnosisreport.controller');


const checkAuthMiddleWare = require('../middleware/check-auth');
const router = express.Router();

// router.post('/', patientController.save);
 
router.post('/',diagnosisreportcontroller.createDiagnosisReport);
//router.get('/:patientId',diagnosisreportcontroller.getDiagnosisReportsByPatientId) ;
// router.get('/:patientId',checkAuthMiddleWare.checkAuth ,appointmentcontroller.getAppointmentsByPatientId);
// // Update the route parameter name to match the function parameter
// router.get('/appointment/:id', checkAuthMiddleWare.checkAuth, appointmentcontroller.getAppointmentById);
// router.patch('/appointment/:id', checkAuthMiddleWare.checkAuth, appointmentcontroller.updateAppointmentDateTime);
// router.delete('/appointment/:id', checkAuthMiddleWare.checkAuth, appointmentcontroller.deleteAppointment);
router.get('/:appointmentId',diagnosisreportcontroller.getDiagnosiReportaid);
router.delete('/:id',diagnosisreportcontroller.deleteDiagnosisReport);





module.exports = router;