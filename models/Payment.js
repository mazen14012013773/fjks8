const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'المبلغ مطلوب']
    },
    currency: {
        type: String,
        default: 'SAR'
    },
    method: {
        type: String,
        enum: ['card', 'bank_transfer', 'wallet'],
        required: true
    },
    transactionId: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentGateway: String,
    description: String,
    metadata: mongoose.Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date
});

module.exports = mongoose.model('Payment', paymentSchema);
