# معايير وإرشادات الكود - FreelanceHub Platform

## 📐 معايير التسمية

### متغيرات (Variables)
```javascript
// ✅ صحيح - camelCase
const userName = 'Ahmed';
const projectCount = 5;
const isActive = true;

// ❌ خطأ - PascalCase للمتغيرات
const UserName = 'Ahmed';

// ✅ صحيح - بادئات للـ boolean
const isLoading = false;
const hasError = true;
const shouldSubmit = true;
```

### الدوال (Functions)
```javascript
// ✅ صحيح - فعل + اسم مفعول
function getUserProjects() { }
function validateEmail() { }
function formatCurrency() { }

// ❌ خطأ - أسماء غير واضحة
function getData() { }
function process() { }
```

### الثوابت (Constants)
```javascript
// ✅ صحيح - UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const API_BASE_URL = 'https://api.freelancehub.com';
const DEFAULT_LANGUAGE = 'ar';

// ❌ خطأ - camelCase للثوابت
const maxFileSize = 10 * 1024 * 1024;
```

### الفئات (Classes) - إذا استخدمناها في المستقبل
```javascript
// ✅ صحيح - PascalCase
class UserManager { }
class ProjectRepository { }

// ❌ خطأ - camelCase للفئات
class userManager { }
```

### معرفات الـ HTML (IDs & Classes)
```html
<!-- ✅ صحيح - kebab-case -->
<div id="user-profile-card"></div>
<div class="project-list-container"></div>

<!-- ❌ خطأ - camelCase في HTML -->
<div id="userProfileCard"></div>
```

---

## 📝 التعليقات (Comments)

### التعليقات الفردية (Single Line)
```javascript
// هذا متغير يحفظ عدد المشاريع
const projectCount = 5;

// تحديث واجهة المستخدم
updateUI();
```

### التعليقات الكبيرة (Block Comments)
```javascript
/* ========================================
   وحدة المشاريع - Project Module
   ======================================== */

/**
 * الحصول على قائمة المشاريع
 * @param {Object} filters - معايير التصفية
 * @param {string} filters.status - حالة المشروع
 * @param {string} filters.category - فئة المشروع
 * @returns {Promise<Object>} نتيجة الطلب
 */
async function getProjects(filters = {}) {
    // الكود
}
```

### تعليقات الوظائف (JSDoc)
```javascript
/**
 * تحويل الرقم لصيغة عملة
 * @param {number} amount - المبلغ
 * @param {string} currency - رمز العملة (SAR, USD, etc)
 * @returns {string} المبلغ المنسق
 * @example
 * formatCurrency(1500, 'SAR'); // "1,500.00 ر.س"
 */
function formatCurrency(amount, currency = 'SAR') {
    return amount.toFixed(2) + ' ' + currency;
}
```

---

## 📂 بنية الملفات والمجلدات

### تنظيم الملفات
```
assets/
├── css/
│   ├── base/              # الأساليب الأساسية
│   ├── components/        # أساليب المكونات
│   ├── utilities/         # فئات مساعدة
│   └── style.css          # النمط الرئيسي
├── js/
│   ├── modules/           # الوحدات الرئيسية
│   ├── utils/             # دوال مساعدة
│   ├── config.js          # إعدادات التطبيق
│   └── main.js            # ملف الدخول الرئيسي
└── images/
    ├── icons/
    ├── avatars/
    └── projects/
```

### تسمية الملفات
```javascript
// ✅ صحيح - kebab-case مع امتداد .js
user-profile.js
project-manager.js
auth-module.js

// ❌ خطأ - camelCase
userProfile.js
projectManager.js

// ✅ صحيح لملفات HTML
user-settings.html
project-details.html

// ❌ خطأ - PascalCase
UserSettings.html
ProjectDetails.html
```

---

## 🎯 معايير الكود

### مسافات بادئة (Indentation)
```javascript
// ✅ صحيح - 4 مسافات أو 1 tab
function getUserData() {
    if (isAuthenticated()) {
        const user = getUser();
        return user;
    }
}

// ❌ خطأ - مسافات بادئة غير متسقة
function getUserData() {
  if (isAuthenticated()) {
        const user = getUser();
    return user;
}
```

### طول السطر (Line Length)
```javascript
// ✅ صحيح - لا تتجاوز 80-100 حرف
const message = 'رسالة قصيرة';

// ❌ خطأ - سطر طويل جداً
const message = 'هذه رسالة طويلة جداً قد تتسبب في صعوبة قراءة الكود وتتطلب تمرير أفقي في المحرر';

// ✅ حل البساطة - فصل السطر الطويل
const message = 'هذه رسالة طويلة ' +
               'تم فصلها عبر سطور متعددة ' +
               'لتحسين القراءة';
```

### المتغيرات المحلية (Local Variables)
```javascript
// ✅ صحيح - متغيرات محلية في نطاق الدالة
function calculateTotal(items) {
    let total = 0;
    items.forEach(item => {
        total += item.price;
    });
    return total;
}

// ❌ خطأ - استخدام متغيرات عامة غير لازم
let total = 0;
function calculateTotal(items) {
    total = 0;
    // ...
}
```

### const و let (Const vs Let)
```javascript
// ✅ صحيح - استخدم const بشكل افتراضي
const userName = 'Ahmed';
const projectId = 123;

// ✅ استخدم let عند الحاجة للتعديل
let count = 0;
count++;

// ❌ تجنب var
var userName = 'Ahmed';
```

---

## 🔧 معالجة الأخطاء (Error Handling)

### Try-Catch
```javascript
// ✅ صحيح - معالجة شاملة للأخطاء
async function loadProjectData(projectId) {
    try {
        const result = await ProjectsModule.getProjectDetails(projectId);
        if (!result.ok) {
            AppModule.showError(result.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error('خطأ:', error);
        AppModule.showError('حدث خطأ أثناء تحميل البيانات');
        return null;
    }
}

// ❌ خطأ - عدم التعامل مع الأخطاء
async function loadProjectData(projectId) {
    const result = await ProjectsModule.getProjectDetails(projectId);
    return result.data; // قد يسبب خطأ
}
```

### Check for Null/Undefined
```javascript
// ✅ صحيح - التحقق من القيم الفارغة
function getUserName(user) {
    if (!user || !user.name) {
        return 'غير معروف';
    }
    return user.name;
}

// ❌ خطأ - عدم التحقق
function getUserName(user) {
    return user.name; // قد يسبب خطأ إذا كان user محذوفًا
}
```

---

## 🎨 معالجة JSON والبيانات

### بنية الاستجابة الموحدة
```javascript
// ✅ صحيح - استجابة موحدة
{
    "ok": true,
    "data": {
        "projects": [...],
        "total": 10
    }
}

// خطأ في العملية
{
    "ok": false,
    "error": "وصف الخطأ"
}

// ✅ استخدام الاستجابة
const result = await ProjectsModule.getProjects();
if (result.ok) {
    processProjects(result.data.projects);
} else {
    showErrorMessage(result.error);
}
```

---

## 🔐 أمان الكود (Security)

### عدم تخزين كلمات المرور (Passwords)
```javascript
// ❌ خطأ - لا تخزن كلمة المرور أبداً
localStorage.setItem('password', password);

// ✅ صحيح - خزن الـ token فقط
localStorage.setItem('authToken', token);
```

### تجنب Inline Scripts
```html
<!-- ❌ خطأ -->
<button onclick="deleteProject()">حذف</button>

<!-- ✅ صحيح -->
<button id="delete-btn">حذف</button>
<script>
    document.getElementById('delete-btn').addEventListener('click', deleteProject);
</script>
```

### معالجة البيانات الحساسة
```javascript
// ✅ صحيح - لا تطبع بيانات حساسة
console.log('تم تسجيل الدخول بنجاح'); // ✓
console.log(token); // ✗ لا تطبع الـ token

// ✅ صحيح - وسم البيانات غير الآمنة
// TODO: تحديث كلمة المرور الضعيفة
```

---

## ✨ الممارسات الجيدة

### 1. الوضوح أولاً
```javascript
// ❌ خطأ - ذكي لكن غير واضح
const result = users.filter(u => u.t === 'f').map(u => u.n);

// ✅ صحيح - واضح بلا التباس
const freelancers = users.filter(user => user.type === 'freelancer');
const freelancerNames = freelancers.map(freelancer => freelancer.name);
```

### 2. DRY - Don't Repeat Yourself
```javascript
// ❌ خطأ - تكرار كود
const message1 = formatMessage('مرحبا');
AppModule.showSuccess(message1);

const message2 = formatMessage('شكراً');
AppModule.showSuccess(message2);

// ✅ صحيح - دالة مساعدة
function showFormattedMessage(text) {
    const message = formatMessage(text);
    AppModule.showSuccess(message);
}

showFormattedMessage('مرحبا');
showFormattedMessage('شكراً');
```

### 3. Single Responsibility Principle
```javascript
// ❌ خطأ - دالة تفعل عدة أشياء
async function handleProjectSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const project = Object.fromEntries(formData);
    await ProjectsModule.createProject(project);
    updateProjectsList();
    showSuccessMessage('تم إنشاء المشروع');
    redirectToDashboard();
}

// ✅ صحيح - كل دالة لها مسؤولية واحدة
async function handleProjectSubmit(e) {
    e.preventDefault();
    const project = getProjectFromForm(e.target);
    await createAndNotify(project);
}

function getProjectFromForm(form) {
    return Object.fromEntries(new FormData(form));
}

async function createAndNotify(project) {
    const result = await ProjectsModule.createProject(project);
    if (result.ok) {
        AppModule.showSuccess('تم إنشاء المشروع');
        updateProjectsList();
        redirectToDashboard();
    }
}
```

---

## 🧪 أمثلة عملية

### مثال: وحدة جديدة
```javascript
/* ========================================
   وحدة الإحصائيات - Statistics Module
   ======================================== */

const StatisticsModule = (() => {
    const apiBase = Config.getBaseURL();

    /**
     * الحصول على إحصائيات المستخدم
     * @returns {Promise<Object>} الإحصائيات
     */
    const getUserStatistics = async () => {
        try {
            return await AppModule.apiRequest(
                Config.endpoints.dashboard.stats,
                { method: 'GET' }
            );
        } catch (error) {
            console.error('خطأ في جلب الإحصائيات:', error);
            return { ok: false, error: error.message };
        }
    };

    /**
     * الحصول على الأنشطة الأخيرة
     * @param {number} limit - عدد النتائج
     * @returns {Promise<Object>} الأنشطة
     */
    const getRecentActivity = async (limit = 10) => {
        try {
            return await AppModule.apiRequest(
                `${Config.endpoints.dashboard.activity}?limit=${limit}`,
                { method: 'GET' }
            );
        } catch (error) {
            console.error('خطأ في جلب الأنشطة:', error);
            return { ok: false, error: error.message };
        }
    };

    // API العام
    return {
        getUserStatistics,
        getRecentActivity
    };
})();
```

### مثال: صفحة جديدة
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الإحصائيات</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div id="navbar-container"></div>
    <main class="p-4">
        <h1>الإحصائيات</h1>
        <div id="stats-container"></div>
    </main>

    <script src="assets/js/auth.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/statistics.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            // التحقق من التسجيل
            AppModule.redirectIfNotAuthenticated('login.html');

            // تحميل المكونات
            await loadNavbar();

            // تحميل البيانات
            await loadStatistics();
        });

        async function loadNavbar() {
            const navbarHTML = await AppModule.loadComponent('components/navbar.html');
            document.getElementById('navbar-container').innerHTML = navbarHTML;
        }

        async function loadStatistics() {
            const container = document.getElementById('stats-container');
            container.innerHTML = '<div class="spinner-border"></div>';

            const result = await StatisticsModule.getUserStatistics();
            if (result.ok) {
                displayStatistics(result.data);
            } else {
                AppModule.showError(result.error);
            }
        }

        function displayStatistics(stats) {
            const html = `
                <div class="row">
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>${stats.totalProjects}</h5>
                                <p>المشاريع</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('stats-container').innerHTML = html;
        }
    </script>
</body>
</html>
```

---

## 📋 قائمة التحقق قبل الالتزام (Pre-Commit Checklist)

- [ ] الكود يتبع معايير التسمية
- [ ] جميع الأخطاء معالجة (try-catch)
- [ ] التعليقات واضحة وموجودة
- [ ] لا توجد متغيرات محذوفة (console.logs)
- [ ] الملفات مسماة بشكل صحيح
- [ ] المسافات البادئة متسقة
- [ ] لا توجد بيانات حساسة في الكود
- [ ] لا توجد hardcoded values

---

**آخر تحديث**: 2024
**الإصدار**: 1.0
