/* ========================================
   API Configuration
   ======================================== */

// Determine the API base URL based on environment
const API_CONFIG = {
    // Development Environment
    development: {
        baseURL: 'http://localhost:3000/api', // Change port as needed
        timeout: 30000,
        enableLogging: true
    },

    // Staging Environment
    staging: {
        baseURL: 'https://staging-api.freelancehub.com/api',
        timeout: 30000,
        enableLogging: true
    },

    // Production Environment
    production: {
        baseURL: 'https://fjks8-production.up.railway.app/api',
        timeout: 30000,
        enableLogging: false
    }
};

// Get current environment
const getCurrentEnvironment = () => {
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'development';
    } else if (hostname.includes('staging')) {
        return 'staging';
    } else {
        return 'production';
    }
};

// Export configuration
const Config = {
    env: getCurrentEnvironment(),
    
    // Get API base URL
    getBaseURL: function() {
        return API_CONFIG[this.env].baseURL;
    },

    // Get timeout
    getTimeout: function() {
        return API_CONFIG[this.env].timeout;
    },

    // Check if logging is enabled
    isLoggingEnabled: function() {
        return API_CONFIG[this.env].enableLogging;
    },

    // API Endpoints
    endpoints: {
        // Authentication
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            logout: '/auth/logout',
            forgotPassword: '/auth/forgot-password',
            resetPassword: '/auth/reset-password',
            profile: '/auth/profile',
            changePassword: '/auth/change-password'
        },

        // Projects
        projects: {
            list: '/projects',
            details: (id) => `/projects/${id}`,
            create: '/projects',
            update: (id) => `/projects/${id}`,
            delete: (id) => `/projects/${id}`,
            myProjects: '/user/projects',
            changeStatus: (id) => `/projects/${id}/status`,
            
            // Proposals
            submitProposal: (id) => `/projects/${id}/proposals`,
            getProposals: (id) => `/projects/${id}/proposals`,
            myProposals: '/user/proposals',
            acceptProposal: (id) => `/proposals/${id}/accept`,
            rejectProposal: (id) => `/proposals/${id}/reject`
        },

        // Messaging
        messages: {
            conversations: '/messages/conversations',
            conversationDetails: (id) => `/messages/conversations/${id}`,
            sendMessage: (id) => `/messages/conversations/${id}`,
            startConversation: '/messages/conversations',
            deleteConversation: (id) => `/messages/conversations/${id}`,
            markAsRead: (id) => `/messages/conversations/${id}/read`,
            unreadCount: '/messages/unread-count'
        },

        // Dashboard
        dashboard: {
            stats: '/dashboard/stats',
            activity: '/dashboard/activity',
            activeProjects: '/dashboard/active-projects',
            pendingProposals: '/dashboard/pending-proposals',
            financialStats: '/dashboard/financial'
        },

        // Payments & Withdrawals
        payments: {
            list: '/payments',
            history: '/payments/history',
            summary: '/payments/summary'
        },

        withdrawals: {
            list: '/withdrawals',
            create: '/withdrawals',
            details: (id) => `/withdrawals/${id}`,
            cancel: (id) => `/withdrawals/${id}/cancel`
        },

        wallet: '/wallet',

        // Users/Freelancers
        users: {
            profile: (id) => `/users/${id}`,
            freelancers: '/freelancers',
            freelancerDetails: (id) => `/freelancers/${id}`,
            freelancerReviews: (id) => `/freelancers/${id}/reviews`
        },

        // Admin
        admin: {
            stats: '/admin/stats',
            users: '/admin/users',
            projects: '/admin/projects',
            payments: '/admin/payments'
        },

        // Settings & Notifications
        settings: '/settings',
        notifications: {
            list: '/notifications',
            markAsRead: (id) => `/notifications/${id}/read`,
            delete: (id) => `/notifications/${id}`
        }
    },

    // Helper method to build full URL
    buildURL: function(endpoint) {
        return this.getBaseURL() + endpoint;
    },

    // Log API calls in development
    log: function(method, endpoint, data = null) {
        if (this.isLoggingEnabled()) {
            console.log(`[${method}] ${this.buildURL(endpoint)}`, data || '');
        }
    },

    // Get headers with authentication
    getHeaders: function(token = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }
};

// Make Config globally available
if (typeof window !== 'undefined') {
    window.Config = Config;
}
