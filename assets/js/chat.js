/**
 * Chat Module
 * إدارة الرسائل والمحادثات
 */

const ChatModule = (() => {
    /**
     * الحصول على قائمة المحادثات
     */
    async function getConversations(page = 1, limit = 20) {
        return AppModule.apiRequest(`/messages/conversations?page=${page}&limit=${limit}`);
    }
    
    /**
     * الحصول على رسائل محادثة معينة
     */
    async function getMessages(conversationId, page = 1) {
        return AppModule.apiRequest(`/messages/conversations/${conversationId}?page=${page}`);
    }
    
    /**
     * إرسال رسالة
     */
    async function sendMessage(conversationId, message) {
        return AppModule.apiRequest(`/messages/conversations/${conversationId}`, {
            method: 'POST',
            body: JSON.stringify({ message })
        });
    }
    
    /**
     * بدء محادثة جديدة
     */
    async function startConversation(userId) {
        return AppModule.apiRequest('/messages/conversations', {
            method: 'POST',
            body: JSON.stringify({ userId })
        });
    }
    
    /**
     * حذف محادثة
     */
    async function deleteConversation(conversationId) {
        return AppModule.apiRequest(`/messages/conversations/${conversationId}`, {
            method: 'DELETE'
        });
    }
    
    /**
     * وضع علامة على المحادثة كمقروءة
     */
    async function markAsRead(conversationId) {
        return AppModule.apiRequest(`/messages/conversations/${conversationId}/read`, {
            method: 'PUT'
        });
    }
    
    /**
     * عدد الرسائل غير المقروءة
     */
    async function getUnreadCount() {
        return AppModule.apiRequest('/messages/unread-count');
    }
    
    // Public API
    return {
        getConversations,
        getMessages,
        sendMessage,
        startConversation,
        deleteConversation,
        markAsRead,
        getUnreadCount
    };
})();
