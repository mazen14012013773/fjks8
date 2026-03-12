const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { login, register, updateProfile, changePassword } = require('../controllers/authController');

/**
 * تسجيل الدخول
 * POST /api/auth/login
 */
router.post('/login', login);

/**
 * التسجيل الجديد
 * POST /api/auth/register
 */
router.post('/register', register);

/**
 * تحديث الملف الشخصي
 * PUT /api/auth/profile
 */
router.put('/profile', authMiddleware, updateProfile);

/**
 * تغيير كلمة المرور
 * POST /api/auth/change-password
 */
router.post('/change-password', authMiddleware, changePassword);

/**
 * نسيان كلمة المرور
 * POST /api/auth/forgot-password
 */
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                ok: false,
                error: 'البريد الإلكتروني مطلوب'
            });
        }

        res.json({
            ok: true,
            data: {
                message: 'تم إرسال بريد إعادة تعيين كلمة المرور'
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في استرجاع كلمة المرور'
        });
    }
});

module.exports = router;
