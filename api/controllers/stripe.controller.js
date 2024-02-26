

const stripe = require('stripe')('sk_test_51OMNXlSHm8Tj15e1jD7Vpn4iQtLk4U3nCiSBe5ZuBU2EtLb2PTfhSn5O8RLzVetedlnPhd7I23A3ClptIeRNTXXi00jVHOZBgE');
const models = require('../models');

// Define a logger



function paymentSheet(req, res) {
  const { patientId,PayerName } = req.params; // Assuming the patientId is passed in the URL parameters

  stripe.customers.create()
    .then(customer => {
      return stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2023-10-16' })
        .then(ephemeralKey => {
          return stripe.paymentIntents.create({
            amount: 100,
            currency: 'inr',
            customer: customer.id,
            description: 'Your transaction description here',
            automatic_payment_methods: {
              enabled: true,
            },
          }).then(paymentIntent => {
            // Create a record in the Payment model
            return models.Payment.create({
              TransactionId: paymentIntent.id,
              PatientId: patientId, // Assuming patientId is passed in the URL parameters
              PaymentMethod: 'Stripe', // You might want to adjust this based on your needs
              DateTime: new Date(),
              PayerName: PayerName, // You might want to adjust this based on your needs
            }).then(() => {
              res.json({
                PatientId:patientId,
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id,
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY_TEST,
              });
            });
          });
        });
    })
    .catch(error => {
      console.error(error);
      res.json({ error: true, message: error.message, data: null });
    });
}


  function getPaymentIntents(req, res) {
    stripe.paymentIntents.list({ limit: 10 })
      .then(paymentIntents => {
        const formattedPaymentIntents = paymentIntents.data.map(intent => ({
          id: intent.id,
          amount: intent.amount,
          currency: intent.currency,
          status: intent.status,
          created: intent.created,
          customer: intent.customer,
        }));
        res.json({ success: true, data: formattedPaymentIntents });
      })
      .catch(error => {
        console.error(error);
        res.json({ error: true, message: error.message, data: null });
      });
  }


  
function getPaymentById(req, res) {
    const paymentIntentId = req.params.id;
  
    stripe.paymentIntents.retrieve(paymentIntentId)
      .then((paymentIntent) => {
        if (paymentIntent) {
          res.status(200).json(paymentIntent);
        } else {
          res.status(404).json({
            message: "Payment intent not found"
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          message: "Something went wrong"
        });
      });
  }
  
  
  module.exports = {
    getPaymentById: getPaymentById,
    getPaymentIntents:getPaymentIntents,
    paymentSheet:paymentSheet,
  };