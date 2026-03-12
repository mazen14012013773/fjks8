const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    getDashboardStats,
    getRecentActivity,
    getActiveProjects
} = require('../controllers/dashboardController');

/**
 * الحصول على إحصائيات لوحة التحكم
 * GET /api/dashboard/stats
 */
router.get('/stats', authMiddleware, getDashboardStats);

/**
 * الحصول على الأنشطة الأخيرة
 * GET /api/dashboard/activity
 */
router.get('/activity', authMiddleware, getRecentActivity);

/**
 * الحصول على المشاريع النشطة
 * GET /api/dashboard/active-projects
 */
router.get('/active-projects', authMiddleware, getActiveProjects);

module.exports = router;
