const express = require('express');
const medicineController = require('../controllers/medicine.controller');


const checkAuthMiddleWare = require('../middleware/check-auth');
const router = express.Router();

// router.post('/', patientController.save);
 
router.post('/', medicineController.saveMedicine);
router.get('/:appointmentId', medicineController.getMedicinesByAppointmentId);
router.patch('/:medId', medicineController.updateMedicine);
router.delete('/:medId', medicineController.deleteMedicine);

module.exports = router;