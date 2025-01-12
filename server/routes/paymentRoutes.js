const express = require('express');
const router = express.Router();
const { createPaymentIntent, saveTransaction } = require('../controllers/paymentController');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/save-transaction', saveTransaction);

module.exports = router;