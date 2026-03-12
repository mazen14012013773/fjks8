/**
 * Dashboard Module
 * إدارة لوحة التحكم والإحصائيات
 */

const DashboardModule = (() => {
    /**
     * الحصول على إحصائيات المستخدم
     */
    async function getUserStats() {
        return AppModule.apiRequest('/dashboard/stats');
    }
    
    /**
     * الحصول على الأنشطة الأخيرة
     */
    async function getRecentActivity(limit = 10) {
        return AppModule.apiRequest(`/dashboard/activity?limit=${limit}`);
    }
    
    /**
     * الحصول على المشاريع في العمل
     */
    async function getActiveProjects() {
        return AppModule.apiRequest('/dashboard/active-projects');
    }
    
    /**
     * الحصول على العروض المعلقة
     */
    async function getPendingProposals() {
        return AppModule.apiRequest('/dashboard/pending-proposals');
    }
    
    /**
     * الحصول على الإحصائيات المالية
     */
    async function getFinancialStats() {
        return AppModule.apiRequest('/dashboard/financial');
    }
    
    /**
     * الحصول على إحصائيات الـ admin
     */
    async function getAdminStats() {
        return AppModule.apiRequest('/admin/stats');
    }
    
    /**
     * الحصول على قائمة المستخدمين (للـ admin)
     */
    async function getUsers(page = 1, limit = 20) {
        return AppModule.apiRequest(`/admin/users?page=${page}&limit=${limit}`);
    }
    
    /**
     * الحصول على قائمة المشاريع (للـ admin)
     */
    async function getAllProjects(page = 1, limit = 20) {
        return AppModule.apiRequest(`/admin/projects?page=${page}&limit=${limit}`);
    }
    
    /**
     * الحصول على قائمة الدفعات (للـ admin)
     */
    async function getPayments(page = 1, limit = 20) {
        return AppModule.apiRequest(`/admin/payments?page=${page}&limit=${limit}`);
    }
    
    // Public API
    return {
        getUserStats,
        getRecentActivity,
        getActiveProjects,
        getPendingProposals,
        getFinancialStats,
        getAdminStats,
        getUsers,
        getAllProjects,
        getPayments
    };
})();
