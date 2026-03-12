const User = require('../models/User');
const Project = require('../models/Project');
const Payment = require('../models/Payment');

/**
 * الحصول على إحصائيات لوحة التحكم
 */
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        const activeProjects = await Project.countDocuments({
            assignedTo: userId,
            status: 'in_progress'
        });

        const pendingProposals = await Project.countDocuments({
            client: userId,
            status: 'open'
        });

        const user = await User.findById(userId);

        res.json({
            ok: true,
            data: {
                activeProjects,
                pendingProposals,
                monthlyEarnings: user.totalEarnings,
                totalEarnings: user.totalEarnings,
                walletBalance: user.walletBalance,
                rating: user.rating
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على الإحصائيات'
        });
    }
};

/**
 * الحصول على الأنشطة الأخيرة
 */
exports.getRecentActivity = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { limit = 10 } = req.query;

        // هذا مثال - في الإنتاج يمكن إنشاء نموذج Activity منفصل
        const recentProjects = await Project.find({ client: userId })
            .select('title createdAt status')
            .limit(limit)
            .sort({ createdAt: -1 });

        const activities = recentProjects.map(p => ({
            type: 'project_created',
            title: p.title,
            description: `تم إنشاء مشروع: ${p.title}`,
            icon: 'briefcase',
            createdAt: p.createdAt
        }));

        res.json({
            ok: true,
            data: { activities }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على الأنشطة'
        });
    }
};

/**
 * الحصول على المشاريع النشطة
 */
exports.getActiveProjects = async (req, res) => {
    try {
        const userId = req.user.userId;

        const projects = await Project.find({
            $or: [
                { client: userId },
                { assignedTo: userId }
            ],
            status: 'in_progress'
        })
            .select('title client assignedTo progress deadline')
            .populate('client', 'name')
            .populate('assignedTo', 'name');

        res.json({
            ok: true,
            data: { projects }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على المشاريع النشطة'
        });
    }
};
