const express = require('express');
const stripecontroller = require('../controllers/stripe.controller');


const router = express.Router();


router.post('/payment-intent/:patientId/:PayerName',stripecontroller.paymentSheet);
router.get('/getpaymentdetails/all',stripecontroller.getPaymentIntents);
router.get('getpaymentdetailsbyid/:paymentIntentId',stripecontroller.getPaymentById);


module.exports = router;
