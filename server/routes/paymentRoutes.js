// Import required modules
const express = require('express');
const router = express.Router();
const { createPaymentIntent, saveTransaction } = require('../controllers/paymentController');

// Route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);
// Route to save transaction details
router.post('/save-transaction', saveTransaction);

module.exports = router;