const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    submitProposal,
    getProposals
} = require('../controllers/projectController');

/**
 * الحصول على المشاريع
 * GET /api/projects
 */
router.get('/', getAllProjects);

/**
 * تفاصيل المشروع
 * GET /api/projects/:id
 */
router.get('/:id', getProjectById);

/**
 * إنشاء مشروع جديد
 * POST /api/projects
 */
router.post('/', authMiddleware, createProject);

/**
 * تحديث المشروع
 * PUT /api/projects/:id
 */
router.put('/:id', authMiddleware, updateProject);

/**
 * حذف المشروع
 * DELETE /api/projects/:id
 */
router.delete('/:id', authMiddleware, deleteProject);

/**
 * تقديم عرض على المشروع
 * POST /api/projects/:id/proposals
 */
router.post('/:id/proposals', authMiddleware, submitProposal);

/**
 * الحصول على عروض المشروع
 * GET /api/projects/:id/proposals
 */
router.get('/:id/proposals', authMiddleware, getProposals);

module.exports = router;
