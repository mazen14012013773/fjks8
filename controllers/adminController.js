const User = require('../models/User');
const Project = require('../models/Project');
const Payment = require('../models/Payment');

/**
 * الحصول على إحصائيات الإدارة
 */
exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeFreelancers = await User.countDocuments({
            type: 'freelancer',
            isActive: true
        });
        const activeEmployers = await User.countDocuments({
            type: 'employer',
            isActive: true
        });

        const totalProjects = await Project.countDocuments();
        const activeProjects = await Project.countDocuments({
            status: 'in_progress'
        });
        const completedProjects = await Project.countDocuments({
            status: 'completed'
        });

        const payments = await Payment.aggregate([
            { $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
                totalCount: { $sum: 1 }
            }}
        ]);

        const totalPayments = payments[0]?.totalAmount || 0;
        const totalRevenue = (totalPayments * 0.1); // 10% commission

        res.json({
            ok: true,
            data: {
                totalUsers,
                activeFreelancers,
                activeEmployers,
                totalProjects,
                activeProjects,
                completedProjects,
                totalPayments,
                totalRevenue,
                platformHealth: 'Excellent'
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على إحصائيات الإدارة'
        });
    }
};

/**
 * الحصول على قائمة المستخدمين
 */
exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const users = await User.find()
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments();

        res.json({
            ok: true,
            data: {
                users,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على قائمة المستخدمين'
        });
    }
};

/**
 * الحصول على قائمة المشاريع
 */
exports.getProjects = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const projects = await Project.find()
            .populate('client', 'name email')
            .populate('assignedTo', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Project.countDocuments();

        res.json({
            ok: true,
            data: {
                projects,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على قائمة المشاريع'
        });
    }
};

/**
 * الحصول على قائمة الدفعات
 */
exports.getPayments = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const payments = await Payment.find()
            .populate('user', 'name email')
            .populate('project', 'title')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Payment.countDocuments();

        res.json({
            ok: true,
            data: {
                payments,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على قائمة الدفعات'
        });
    }
};
