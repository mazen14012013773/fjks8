const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'يجب إدخال الاسم'],
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: [true, 'يجب إدخال البريد الإلكتروني'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'يجب إدخال بريد صحيح']
    },
    password: {
        type: String,
        required: [true, 'يجب إدخال كلمة المرور'],
        minlength: 6,
        select: false
    },
    phone: String,
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/100'
    },
    type: {
        type: String,
        enum: ['freelancer', 'employer', 'admin'],
        default: 'freelancer'
    },
    bio: String,
    title: String,
    skills: [String],
    hourlyRate: Number,
    verified: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    completedProjects: {
        type: Number,
        default: 0
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    bankAccount: {
        accountNumber: String,
        bankName: String,
        iban: String
    },
    walletBalance: {
        type: Number,
        default: 0
    },
    social: {
        linkedin: String,
        twitter: String,
        portfolio: String
    },
    preferences: {
        notifications: { type: Boolean, default: true },
        newsletter: { type: Boolean, default: false }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
