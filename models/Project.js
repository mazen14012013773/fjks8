const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'يجب إدخال عنوان المشروع'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'يجب إدخال وصف المشروع']
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'design', 'writing', 'marketing', 'other'],
        required: true
    },
    skills: [String],
    budget: {
        type: Number,
        required: [true, 'يجب إدخال الميزانية']
    },
    budget_type: {
        type: String,
        enum: ['fixed', 'hourly'],
        default: 'fixed'
    },
    status: {
        type: String,
        enum: ['draft', 'open', 'in_progress', 'completed', 'cancelled'],
        default: 'open'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deadline: Date,
    attachments: [String],
    views: {
        type: Number,
        default: 0
    },
    proposals: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
