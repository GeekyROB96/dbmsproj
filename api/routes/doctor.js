const express = require('express');
const doctorController = require('../controllers/doctor.controller');


const checkAuthMiddleWare = require('../middleware/check-auth');
const router = express.Router();

// router.post('/', patientController.save);
router.post('/sign-up', doctorController.signUp);

router.get('/',doctorController.index);
router.get('/:id',doctorController.show);
router.get('/doctor/:id',doctorController.doctorbyid);
router.patch('/:id',checkAuthMiddleWare.checkAuth,doctorController.update);
router.delete('/:id',doctorController.destroy);
router.post('/login',doctorController.login);




module.exports = router;