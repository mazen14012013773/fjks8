const jwt = require('jsonwebtoken');

/**
 * التحقق من صحة التوكن
 */
const authMiddleware = (req, res, next) => {
    try {
        // الحصول على التوكن من الـ header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                ok: false,
                error: 'توكن مفقود'
            });
        }

        // التحقق من صحة التوكن
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                error: 'انتهت صلاحية التوكن'
            });
        }
        return res.status(401).json({
            ok: false,
            error: 'توكن غير صحيح'
        });
    }
};

/**
 * التحقق من أن المستخدم مسؤول
 */
const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({
            ok: false,
            error: 'ليس لديك صلاحية الوصول'
        });
    }
    next();
};

/**
 * معالج الأخطاء
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    const status = err.status || 500;
    const message = err.message || 'خطأ في الخادم';
    
    res.status(status).json({
        ok: false,
        error: message
    });
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    errorHandler
};
