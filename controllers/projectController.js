const Project = require('../models/Project');
const Proposal = require('../models/Proposal');

/**
 * الحصول على المشاريع
 */
exports.getAllProjects = async (req, res) => {
    try {
        const { status, category, search, page = 1, limit = 10 } = req.query;

        let query = {};
        if (status) query.status = status;
        if (category) query.category = category;
        if (search) query.title = { $regex: search, $options: 'i' };

        const projects = await Project.find(query)
            .populate('client', 'name avatar rating')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Project.countDocuments(query);

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
            error: 'خطأ في الحصول على المشاريع'
        });
    }
};

/**
 * الحصول على تفاصيل المشروع
 */
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate('client', 'name avatar rating');

        if (!project) {
            return res.status(404).json({
                ok: false,
                error: 'المشروع غير موجود'
            });
        }

        res.json({
            ok: true,
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على تفاصيل المشروع'
        });
    }
};

/**
 * إنشاء مشروع جديد
 */
exports.createProject = async (req, res) => {
    try {
        const { title, description, category, budget, budget_type, skills, deadline } = req.body;
        const clientId = req.user.userId;

        const project = new Project({
            title,
            description,
            category,
            budget,
            budget_type,
            skills,
            deadline,
            client: clientId
        });

        await project.save();

        res.status(201).json({
            ok: true,
            data: { project }
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error: error.message
        });
    }
};

/**
 * تحديث المشروع
 */
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const project = await Project.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        res.json({
            ok: true,
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في تحديث المشروع'
        });
    }
};

/**
 * حذف المشروع
 */
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        await Project.findByIdAndDelete(id);

        res.json({
            ok: true,
            data: { message: 'تم حذف المشروع بنجاح' }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في حذف المشروع'
        });
    }
};

/**
 * تقديم عرض على المشروع
 */
exports.submitProposal = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, timeline, message } = req.body;
        const freelancerId = req.user.userId;

        const proposal = new Proposal({
            project: id,
            freelancer: freelancerId,
            amount,
            timeline,
            message
        });

        await proposal.save();

        // تحديث عدد العروض للمشروع
        await Project.findByIdAndUpdate(
            id,
            { $inc: { proposals: 1 } }
        );

        res.status(201).json({
            ok: true,
            data: { proposal }
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error: error.message
        });
    }
};

/**
 * الحصول على عروض المشروع
 */
exports.getProposals = async (req, res) => {
    try {
        const { id } = req.params;

        const proposals = await Proposal.find({ project: id })
            .populate('freelancer', 'name avatar rating completedProjects');

        res.json({
            ok: true,
            data: { proposals }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على العروض'
        });
    }
};
