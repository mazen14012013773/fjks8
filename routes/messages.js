const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    getConversations,
    getMessages,
    sendMessage,
    startConversation,
    getUnreadCount
} = require('../controllers/messageController');

/**
 * الحصول على الرسائل
 * GET /api/messages/conversations
 */
router.get('/conversations', authMiddleware, getConversations);

/**
 * الحصول على رسائل الحوار
 * GET /api/messages/conversations/:id
 */
router.get('/conversations/:id', authMiddleware, getMessages);

/**
 * إرسال رسالة
 * POST /api/messages/conversations/:id
 */
router.post('/conversations/:id', authMiddleware, sendMessage);

/**
 * بدء حوار جديد
 * POST /api/messages/conversations
 */
router.post('/conversations', authMiddleware, startConversation);

/**
 * الحصول على عدد الرسائل غير المقروءة
 * GET /api/messages/unread-count
 */
router.get('/unread-count', authMiddleware, getUnreadCount);

module.exports = router;
