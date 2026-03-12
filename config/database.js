const mongoose = require('mongoose');

/**
 * الاتصال بقاعدة البيانات MongoDB
 */
const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/freelancedb';

        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });

        console.log('✓ تم الاتصال بقاعدة البيانات بنجاح');
        return mongoose.connection;
    } catch (error) {
        console.warn('⚠️ تحذير: لم يتمكن من الاتصال بقاعدة البيانات:', error.message);
        console.log('✓ الخادم سيبدأ بدون قاعدة بيانات (وضع التطوير المحلي)');
        return null;
    }
};

module.exports = { connectDB };
