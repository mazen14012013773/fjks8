const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
    getAdminStats,
    getUsers,
    getProjects,
    getPayments
} = require('../controllers/adminController');

/**
 * الحصول على إحصائيات الإدارة
 * GET /api/admin/stats
 */
router.get('/stats', authMiddleware, adminMiddleware, getAdminStats);

/**
 * الحصول على قائمة المستخدمين
 * GET /api/admin/users
 */
router.get('/users', authMiddleware, adminMiddleware, getUsers);

/**
 * الحصول على قائمة المشاريع
 * GET /api/admin/projects
 */
router.get('/projects', authMiddleware, adminMiddleware, getProjects);

/**
 * الحصول على قائمة الدفعات
 * GET /api/admin/payments
 */
router.get('/payments', authMiddleware, adminMiddleware, getPayments);

module.exports = router;
