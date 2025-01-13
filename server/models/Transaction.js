const mongoose = require('mongoose');

// schema for the "Transaction" model
const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['succeeded', 'pending', 'failed'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema); 