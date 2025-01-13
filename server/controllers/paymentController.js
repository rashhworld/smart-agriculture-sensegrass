// Import necessary modules and models
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Create a payment intent for processing the payment
exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body; // Get the amount to be charged

        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert amount to paise for INR
            currency: 'inr', // Set the currency to INR (Indian Rupee)
            metadata: {
                userId: req.user.userId,
                credits: amount
            },
            description: `Purchase of ${amount} credits for Smart Agriculture Management System`,
            shipping: {
                name: 'Digital Service',
                address: {
                    line1: 'Digital Product',
                    city: 'Digital Delivery',
                    state: 'Digital Service',
                    postal_code: '000000',
                    country: 'IN'
                }
            },
            statement_descriptor: 'Smart Agri Credits',
            statement_descriptor_suffix: 'Credits'
        });

        res.status(200).json({ status: 'success', clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: error.message });
    }
};

// Save the transaction and update the user's credits after successful payment
exports.saveTransaction = async (req, res) => {
    try {
        // Create a new transaction record
        await Transaction.create({ ...req.body, user: req.user.userId });

        // Update the user's credits by incrementing them
        await User.findByIdAndUpdate(req.user.userId, { $inc: { credits: req.body.amount } });
        res.status(200).json({ status: 'success', msg: 'Transaction saved successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: error.message });
    }
};