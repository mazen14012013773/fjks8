/**
 * Projects Module
 * إدارة المشاريع والعروض
 */

const ProjectsModule = (() => {
    /**
     * الحصول على قائمة المشاريع
     */
    async function getProjects(filters = {}) {
        const query = new URLSearchParams();
        
        if (filters.status) query.append('status', filters.status);
        if (filters.category) query.append('category', filters.category);
        if (filters.search) query.append('search', filters.search);
        if (filters.page) query.append('page', filters.page);
        if (filters.limit) query.append('limit', filters.limit);
        
        const endpoint = `/projects?${query.toString()}`;
        return AppModule.apiRequest(endpoint);
    }
    
    /**
     * الحصول على تفاصيل مشروع معين
     */
    async function getProjectDetails(projectId) {
        return AppModule.apiRequest(`/projects/${projectId}`);
    }
    
    /**
     * إنشاء مشروع جديد
     */
    async function createProject(projectData) {
        return AppModule.apiRequest('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }
    
    /**
     * تحديث المشروع
     */
    async function updateProject(projectId, projectData) {
        return AppModule.apiRequest(`/projects/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(projectData)
        });
    }
    
    /**
     * حذف المشروع
     */
    async function deleteProject(projectId) {
        return AppModule.apiRequest(`/projects/${projectId}`, {
            method: 'DELETE'
        });
    }
    
    /**
     * الحصول على مشاريع المستخدم
     */
    async function getMyProjects(status = null) {
        let endpoint = '/user/projects';
        if (status) endpoint += `?status=${status}`;
        
        return AppModule.apiRequest(endpoint);
    }
    
    /**
     * إضافة عرض (proposal) على مشروع
     */
    async function submitProposal(projectId, proposalData) {
        return AppModule.apiRequest(`/projects/${projectId}/proposals`, {
            method: 'POST',
            body: JSON.stringify(proposalData)
        });
    }
    
    /**
     * الحصول على عروض المشروع
     */
    async function getProjectProposals(projectId) {
        return AppModule.apiRequest(`/projects/${projectId}/proposals`);
    }
    
    /**
     * الحصول على عروضي
     */
    async function getMyProposals(status = null) {
        let endpoint = '/user/proposals';
        if (status) endpoint += `?status=${status}`;
        
        return AppModule.apiRequest(endpoint);
    }
    
    /**
     * قبول عرض
     */
    async function acceptProposal(proposalId) {
        return AppModule.apiRequest(`/proposals/${proposalId}/accept`, {
            method: 'POST'
        });
    }
    
    /**
     * رفض عرض
     */
    async function rejectProposal(proposalId) {
        return AppModule.apiRequest(`/proposals/${proposalId}/reject`, {
            method: 'POST'
        });
    }
    
    /**
     * تغيير حالة المشروع
     */
    async function changeProjectStatus(projectId, status) {
        return AppModule.apiRequest(`/projects/${projectId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }
    
    // Public API
    return {
        getProjects,
        getProjectDetails,
        createProject,
        updateProject,
        deleteProject,
        getMyProjects,
        submitProposal,
        getProjectProposals,
        getMyProposals,
        acceptProposal,
        rejectProposal,
        changeProjectStatus
    };
})();
