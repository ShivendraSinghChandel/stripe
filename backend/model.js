const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,  
    },
    orderId: {
        type: String,
        required: true,
        unique: true,  
    },
    customerEmail: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['paid', 'unpaid', 'pending'],
    },
    amount: {
        type: Number,
        required: true,  
    },
    products: [{
        name: String,
        quantity: Number,
        price: Number,  
    }],
    paymentDate: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
