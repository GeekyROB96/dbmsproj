const express = require('express');
const medicineController = require('../controllers/medicine.controller');


const checkAuthMiddleWare = require('../middleware/check-auth');
const router = express.Router();

// router.post('/', patientController.save);
 
router.post('/',medicineController.saveMedicine);

router.get('/:patientId',checkAuthMiddleWare.checkAuth ,medicineController.getMedicineRecordsByPatientId);
router.patch('/:medId',checkAuthMiddleWare.checkAuth,medicineController.updateMedicine);
router.delete('/:medId',medicineController.deleteMedicine);



module.exports = router;