const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * توليد JWT Token
 */
const generateToken = (userId, role) => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );
};

/**
 * تشفير كلمة المرور
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/**
 * التحقق من كلمة المرور
 */
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

/**
 * التحقق من صحة البريد الإلكتروني
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * التحقق من قوة كلمة المرور
 */
const isStrongPassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword,
    isValidEmail,
    isStrongPassword
};
