const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
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

        res.status(200).json({
            status: 'success',
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            msg: error.message
        });
    }
};

exports.saveTransaction = async (req, res) => {
    try {
        await Transaction.create({ ...req.body, user: req.user.userId });
        await User.findByIdAndUpdate(req.user.userId, { $inc: { credits: req.body.amount } });
        res.status(200).json({ status: 'success', msg: 'Transaction saved successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: error.message });
    }
};