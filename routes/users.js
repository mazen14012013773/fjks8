const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    getFreelancers,
    getUserReviews
} = require('../controllers/userController');

/**
 * الحصول على بيانات المستخدم
 * GET /api/users/:id
 */
router.get('/:id', getUserProfile);

/**
 * الحصول على قائمة المستقلين
 * GET /api/users/freelancers
 */
router.get('/freelancers', getFreelancers);

/**
 * الحصول على تقييمات المستخدم
 * GET /api/users/:id/reviews
 */
router.get('/:id/reviews', getUserReviews);

module.exports = router;
