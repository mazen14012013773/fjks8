const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'يجب إدخال المبلغ']
    },
    timeline: {
        type: Number,
        required: [true, 'يجب إدخال المدة الزمنية']
    },
    message: String,
    attachments: [String],
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'hired'],
        default: 'pending'
    },
    rating: Number,
    review: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Proposal', proposalSchema);
