const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'المبلغ مطلوب']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    bankDetails: {
        accountNumber: String,
        bankName: String,
        iban: String
    },
    transactionId: String,
    requestDate: {
        type: Date,
        default: Date.now
    },
    approvedDate: Date,
    completedDate: Date,
    reason: String
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
