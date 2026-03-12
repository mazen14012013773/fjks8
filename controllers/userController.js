const User = require('../models/User');
const Review = require('../models/Review');

/**
 * الحصول على بيانات المستخدم
 */
exports.getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password -walletBalance');

        if (!user) {
            return res.status(404).json({
                ok: false,
                error: 'المستخدم غير موجود'
            });
        }

        res.json({
            ok: true,
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على بيانات المستخدم'
        });
    }
};

/**
 * الحصول على قائمة المستقلين
 */
exports.getFreelancers = async (req, res) => {
    try {
        const { specialty, rating, page = 1, limit = 12 } = req.query;

        let query = { type: 'freelancer', verified: true };

        if (specialty) {
            query.skills = { $in: [specialty] };
        }

        if (rating) {
            query.rating = { $gte: parseFloat(rating) };
        }

        const freelancers = await User.find(query)
            .select('name avatar title rating completedProjects hourlyRate skills')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ rating: -1, completedProjects: -1 });

        const total = await User.countDocuments(query);

        res.json({
            ok: true,
            data: {
                freelancers,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على قائمة المستقلين'
        });
    }
};

/**
 * الحصول على تقييمات المستخدم
 */
exports.getUserReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const reviews = await Review.find({ freelancer: id })
            .populate('client', 'name avatar')
            .sort({ createdAt: -1 });

        res.json({
            ok: true,
            data: { reviews }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على التقييمات'
        });
    }
};
