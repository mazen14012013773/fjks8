const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

/**
 * الحصول على المحادثات
 */
exports.getConversations = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { page = 1, limit = 10 } = req.query;

        const conversations = await Conversation.find({
            participants: userId,
            active: true
        })
            .populate('participants', 'name avatar')
            .populate('project', 'title')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ updatedAt: -1 });

        res.json({
            ok: true,
            data: { conversations }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على المحادثات'
        });
    }
};

/**
 * الحصول على رسائل المحادثة
 */
exports.getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 20 } = req.query;

        // تحديث حالة قراءة الرسائل
        await Message.updateMany(
            { conversation: id, sender: { $ne: req.user.userId } },
            { read: true, readAt: new Date() }
        );

        const messages = await Message.find({ conversation: id })
            .populate('sender', 'name avatar')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        res.json({
            ok: true,
            data: { messages: messages.reverse() }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على الرسائل'
        });
    }
};

/**
 * إرسال رسالة
 */
exports.sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const senderId = req.user.userId;

        if (!content) {
            return res.status(400).json({
                ok: false,
                error: 'محتوى الرسالة مطلوب'
            });
        }

        const message = new Message({
            conversation: id,
            sender: senderId,
            content
        });

        await message.save();

        // تحديث المحادثة
        await Conversation.findByIdAndUpdate(id, {
            lastMessage: content,
            lastMessageAt: new Date(),
            updatedAt: new Date()
        });

        await message.populate('sender', 'name avatar');

        res.status(201).json({
            ok: true,
            data: { message }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في إرسال الرسالة'
        });
    }
};

/**
 * بدء محادثة جديدة
 */
exports.startConversation = async (req, res) => {
    try {
        const { userId } = req.body;
        const currentUserId = req.user.userId;

        // التحقق من وجود محادثة بين المستخدمين
        let conversation = await Conversation.findOne({
            participants: { $all: [currentUserId, userId] }
        });

        if (conversation) {
            return res.json({
                ok: true,
                data: { conversation }
            });
        }

        // إنشاء محادثة جديدة
        conversation = new Conversation({
            participants: [currentUserId, userId]
        });

        await conversation.save();

        res.status(201).json({
            ok: true,
            data: { conversation }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في بدء المحادثة'
        });
    }
};

/**
 * عدد الرسائل غير المقروءة
 */
exports.getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.userId;

        const count = await Message.countDocuments({
            conversation: {
                $in: await Conversation.find({
                    participants: userId
                }).select('_id')
            },
            sender: { $ne: userId },
            read: false
        });

        res.json({
            ok: true,
            data: { unreadCount: count }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في الحصول على الرسائل غير المقروءة'
        });
    }
};
