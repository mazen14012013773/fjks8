/**
 * Auth Module
 * معالجة التوثيق وإدارة الجلسات
 */

const AuthModule = (() => {
    const TOKEN_KEY = 'authToken';
    const USER_KEY = 'currentUser';
    
    /**
     * تسجيل الدخول
     * @param {string} email - البريد الإلكتروني
     * @param {string} password - كلمة المرور
     */
    async function login(email, password) {
        try {
            // سيتم استبدال هذا بـ API call للباكإند
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setUser(data.user);
                return data;
            } else {
                throw new Error('فشل تسجيل الدخول');
            }
        } catch (error) {
            console.error('خطأ في تسجيل الدخول:', error);
            throw error;
        }
    }
    
    /**
     * التسجيل (إنشاء حساب جديد)
     * @param {object} userData - بيانات المستخدم
     */
    async function register(userData) {
        try {
            // سيتم استبدال هذا بـ API call للباكإند
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setUser(data.user);
                return data;
            } else {
                throw new Error('فشل التسجيل');
            }
        } catch (error) {
            console.error('خطأ في التسجيل:', error);
            throw error;
        }
    }
    
    /**
     * تسجيل الخروج
     */
    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.location.href = 'index.html';
    }
    
    /**
     * حفظ التوكن
     */
    function setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }
    
    /**
     * الحصول على التوكن
     */
    function getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }
    
    /**
     * حفظ بيانات المستخدم
     */
    function setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    
    /**
     * الحصول على بيانات المستخدم
     */
    function getUser() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }
    
    /**
     * التحقق من تسجيل الدخول
     */
    function isAuthenticated() {
        return !!getToken() && !!getUser();
    }
    
    /**
     * إعادة تعيين كلمة المرور
     */
    async function requestPasswordReset(email) {
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            return response.ok;
        } catch (error) {
            console.error('خطأ في طلب إعادة تعيين كلمة المرور:', error);
            throw error;
        }
    }
    
    /**
     * تحديث الملف الشخصي
     */
    async function updateProfile(userData) {
        try {
            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                return data;
            } else {
                throw new Error('فشل تحديث الملف الشخصي');
            }
        } catch (error) {
            console.error('خطأ في تحديث الملف الشخصي:', error);
            throw error;
        }
    }
    
    /**
     * تحديث كلمة المرور
     */
    async function changePassword(currentPassword, newPassword) {
        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            
            return response.ok;
        } catch (error) {
            console.error('خطأ في تغيير كلمة المرور:', error);
            throw error;
        }
    }
    
    // Public API
    return {
        login,
        register,
        logout,
        getToken,
        getUser,
        setToken,
        setUser,
        isAuthenticated,
        requestPasswordReset,
        updateProfile,
        changePassword
    };
})();

/**
 * تهيئة عناصر المصادقة عند تحميل الصفحة
 */
function initializeAuthUI() {
    const isAuth = AuthModule.isAuthenticated();
    const user = AuthModule.getUser();
    
    if (isAuth && user) {
        // إظهار شريط التنقل المصرح
        const authNav = document.getElementById('authenticatedNav');
        const guestNav = document.querySelector('nav:not(#authenticatedNav)');
        
        if (authNav) authNav.classList.remove('d-none');
        if (guestNav) guestNav.classList.add('d-none');
        
        // تحديث بيانات المستخدم
        const userNameDisplay = document.getElementById('userNameDisplay');
        const sidebarUserName = document.getElementById('sidebarUserName');
        const sidebarUserRole = document.getElementById('sidebarUserRole');
        
        if (userNameDisplay) userNameDisplay.textContent = user.name || 'المستخدم';
        if (sidebarUserName) sidebarUserName.textContent = user.name || 'المستخدم';
        if (sidebarUserRole) sidebarUserRole.textContent = user.type === 'freelancer' ? 'مستقل' : 'صاحب مشروع';
    }
}

/**
 * تسجيل الخروج العام
 */
function logout() {
    AuthModule.logout();
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeAuthUI);
