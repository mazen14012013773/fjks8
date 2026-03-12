/**
 * Main Module
 * الدوال والمساعدات الأساسية للتطبيق
 */

const AppModule = (() => {
    /**
     * إرسال طلب HTTP
     */
    async function apiRequest(endpoint, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthModule.getToken()}`
            }
        };
        
        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(`/api${endpoint}`, mergedOptions);
            
            if (response.status === 401) {
                // توكن منتهي الصلاحية، إعادة توجيه لتسجيل الدخول
                AuthModule.logout();
            }
            
            return {
                ok: response.ok,
                status: response.status,
                data: response.ok ? await response.json() : null,
                error: response.ok ? null : await response.json()
            };
        } catch (error) {
            console.error('خطأ في الطلب:', error);
            return {
                ok: false,
                status: 0,
                data: null,
                error: { message: 'حدث خطأ في الاتصال' }
            };
        }
    }
    
    /**
     * عرض رسالة نجاح
     */
    function showSuccess(message) {
        showAlert(message, 'success');
    }
    
    /**
     * عرض رسالة خطأ
     */
    function showError(message) {
        showAlert(message, 'danger');
    }
    
    /**
     * عرض رسالة معلومات
     */
    function showInfo(message) {
        showAlert(message, 'info');
    }
    
    /**
     * عرض تنبيه عام
     */
    function showAlert(message, type = 'info') {
        const alertId = 'appAlert_' + Date.now();
        const alertHTML = `
            <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        
        // إزالة التنبيه بعد 5 ثوانٍ
        setTimeout(() => {
            const alert = document.getElementById(alertId);
            if (alert) alert.remove();
        }, 5000);
    }
    
    /**
     * تنسيق التاريخ
     */
    function formatDate(date, locale = 'ar-SA') {
        return new Date(date).toLocaleDateString(locale);
    }
    
    /**
     * تنسيق العملة
     */
    function formatCurrency(amount, currency = 'SAR') {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
    
    /**
     * التحقق من البريد الإلكتروني
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    /**
     * إنشاء عنصر HTML من نص
     */
    function createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
    
    /**
     * تحميل مكون HTML
     */
    async function loadComponent(componentPath) {
        try {
            const response = await fetch(componentPath);
            return await response.text();
        } catch (error) {
            console.error('خطأ في تحميل المكون:', error);
            return '';
        }
    }
    
    /**
     * إضافة تأثير التحميل
     */
    function showLoader(element) {
        element.innerHTML = '<div class="d-flex justify-content-center p-4"><div class="spinner-border" role="status"></div></div>';
    }
    
    /**
     * التحقق من صلاحيات المستخدم
     */
    function hasPermission(permission) {
        const user = AuthModule.getUser();
        if (!user) return false;
        
        // سيتم تطوير نظام الصلاحيات هنا
        return true;
    }
    
    /**
     * إعادة التوجيه للصفحات الداخلية مع التحقق من التصريح
     */
    function redirectIfNotAuthenticated(redirectTo = 'login.html') {
        if (!AuthModule.isAuthenticated()) {
            window.location.href = redirectTo;
        }
    }
    
    /**
     * تحويل الأرقام إلى صيغة عربية
     */
    function convertNumbersToArabic(str) {
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        
        let result = str.toString();
        for (let i = 0; i < 10; i++) {
            result = result.replace(new RegExp(englishNumbers[i], 'g'), arabicNumbers[i]);
        }
        return result;
    }
    
    /**
     * الحصول على وسائط الاستعلام
     */
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // Public API
    return {
        apiRequest,
        showSuccess,
        showError,
        showInfo,
        showAlert,
        formatDate,
        formatCurrency,
        validateEmail,
        createElementFromHTML,
        loadComponent,
        showLoader,
        hasPermission,
        redirectIfNotAuthenticated,
        convertNumbersToArabic,
        getQueryParam
    };
})();
