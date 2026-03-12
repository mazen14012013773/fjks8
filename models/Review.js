const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'التقييم مطلوب'],
        min: 1,
        max: 5
    },
    comment: String,
    categories: {
        communication: Number,
        quality: Number,
        timeliness: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);
