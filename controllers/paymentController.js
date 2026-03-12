const Payment = require('../models/Payment');
const User = require('../models/User');

/**
 * الحصول على سجل الدفعات
 */
exports.getPayments = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { page = 1, limit = 10 } = req.query;

        const payments = await Payment.find({ user: userId })
            .populate('project', 'title')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Payment.countDocuments({ user: userId });

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
            error: 'خطأ في الحصول على الدفعات'
        });
    }
};

/**
 * إنشاء دفعة جديدة
 */
exports.createPayment = async (req, res) => {
    try {
        const { amount, method, projectId } = req.body;
        const userId = req.user.userId;

        if (!amount || !method) {
            return res.status(400).json({
                ok: false,
                error: 'المبلغ وطريقة الدفع مطلوبة'
            });
        }

        const payment = new Payment({
            user: userId,
            amount,
            method,
            project: projectId,
            status: 'pending',
            transactionId: 'TXN' + Date.now()
        });

        await payment.save();

        res.status(201).json({
            ok: true,
            data: { payment }
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error: error.message
        });
    }
};

/**
 * الحصول على بيانات المحفظة
 */
exports.getWallet = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);

        res.json({
            ok: true,
            data: {
                balance: user.walletBalance,
                currency: 'SAR',
                totalEarnings: user.totalEarnings,
                completedProjects: user.completedProjects
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على بيانات المحفظة'
        });
    }
};
