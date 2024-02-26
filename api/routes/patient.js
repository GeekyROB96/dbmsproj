const express = require('express');
const patientController = require('../controllers/patient.controller');


const checkAuthMiddleWare = require('../middleware/check-auth');
const router = express.Router();

// router.post('/', patientController.save);
router.post('/sign-up', patientController.signUp);

router.get('/',patientController.index);
router.get('/:id',patientController.show);
router.patch('/:id',checkAuthMiddleWare.checkAuth,patientController.update);
router.delete('/:id',patientController.destroy);
router.post('/login',patientController.login);



module.exports = router;