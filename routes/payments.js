const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    getPayments,
    createPayment,
    getWallet
} = require('../controllers/paymentController');

/**
 * الحصول على سجل الدفعات
 * GET /api/payments
 */
router.get('/', authMiddleware, getPayments);

/**
 * إنشاء دفعة جديدة
 * POST /api/payments
 */
router.post('/', authMiddleware, createPayment);

/**
 * الحصول على بيانات المحفظة
 * GET /api/wallet
 */
router.get('/wallet', authMiddleware, getWallet);

module.exports = router;
