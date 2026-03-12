# دليل منصة FreelanceHub

## 📋 نظرة عامة

منصة عمل حرة احترافية مبنية بـ HTML5, CSS3, و JavaScript Vanilla. المنصة جاهزة للتكامل مع أي backend REST API.

## 🏗️ هيكل المشروع

```
freelance-platform/
├── index.html                    # الصفحة الرئيسية
├── login.html                    # صفحة تسجيل الدخول
├── register.html                 # صفحة التسجيل
├── forgot-password.html          # استرجاع كلمة المرور
├── dashboard.html                # لوحة المستخدم
├── my-projects.html              # مشاريعي (لصاحب المشروع)
├── my-proposals.html             # عروضي (للمستقل)
├── projects.html                 # تصفح المشاريع
├── freelancers.html              # تصفح المستقلين
├── project-details.html          # تفاصيل المشروع
├── freelancer-profile.html       # ملف المستقل
├── post-project.html             # نشر مشروع
├── messages.html                 # الرسائل والدردشة
├── payments.html                 # إدارة الدفعات
├── transactions.html             # السجل المالي
├── withdraw.html                 # السحب والتحويلات
├── notifications.html            # الإشعارات
├── settings.html                 # الإعدادات
├── how-it-works.html             # كيفية الاستخدام
├── contact.html                  # التواصل معنا
├── about.html                    # عن المنصة
├── faq.html                      # الأسئلة الشائعة
│
├── admin/
│   ├── dashboard.html            # لوحة التحكم
│   ├── users.html                # إدارة المستخدمين
│   ├── projects.html             # إدارة المشاريع
│   └── payments.html             # إدارة الدفعات
│
├── components/
│   ├── navbar.html               # شريط التنقل
│   ├── footer.html               # التذييل
│   └── sidebar.html              # الشريط الجانبي (للنسخة المحدثة)
│
└── assets/
    ├── css/
    │   ├── style.css             # الأساليب الرئيسية
    │   └── responsive.css        # التصميم المتجاوب
    ├── images/
    │   ├── avatars/              # صور الملفات الشخصية
    │   └── projects/             # صور المشاريع
    └── js/
        ├── auth.js               # وحدة المصادقة
        ├── main.js               # الوحدة الرئيسية
        ├── projects.js           # وحدة المشاريع
        ├── chat.js               # وحدة الدردشة
        └── dashboard.js          # وحدة لوحة التحكم
```

## 🔐 المصادقة والتوكن

### نظام التوكن
- نوع التوكن: JWT
- مكان التخزين: localStorage تحت مفتاح `authToken`
- صيغة الإرسال: `Authorization: Bearer <token>`

### كيفية العمل
```javascript
// تسجيل الدخول
await AuthModule.login('user@example.com', 'password');

// فحص التوثيق
if (AuthModule.isAuthenticated()) {
    // المستخدم مسجل دخول
}

// الحصول على البيانات الأساسية
const user = AuthModule.getUser();
const token = AuthModule.getToken();

// تسجيل الخروج
AuthModule.logout();
```

## 🔌 بنية الـ API

### نقاط النهاية (Endpoints)

#### المصادقة (Auth)
```
POST   /api/auth/login                 - تسجيل الدخول
POST   /api/auth/register              - التسجيل
POST   /api/auth/forgot-password       - نسيان كلمة المرور
POST   /api/auth/reset-password        - إعادة تعيين كلمة المرور
PUT    /api/auth/profile               - تحديث الملف الشخصي
POST   /api/auth/change-password       - تغيير كلمة المرور
```

#### المشاريع (Projects)
```
GET    /api/projects                   - الحصول على المشاريع
GET    /api/projects/:id               - تفاصيل مشروع
POST   /api/projects                   - إنشاء مشروع
PUT    /api/projects/:id               - تحديث مشروع
DELETE /api/projects/:id               - حذف مشروع
GET    /api/user/projects              - مشاريعي
PUT    /api/projects/:id/status        - تتغيير حالة المشروع

POST   /api/projects/:id/proposals     - تقديم عرض
GET    /api/projects/:id/proposals     - عروض المشروع
GET    /api/user/proposals             - عروضي
PUT    /api/proposals/:id/accept       - قبول العرض
PUT    /api/proposals/:id/reject       - رفض العرض
```

#### الدردشة (Messages)
```
GET    /api/messages/conversations     - الحوارات
GET    /api/messages/conversations/:id - رسائل الحوار
POST   /api/messages/conversations/:id - إرسال رسالة
POST   /api/messages/conversations     - بدء حوار جديد
DELETE /api/messages/conversations/:id - حذف الحوار
PUT    /api/messages/conversations/:id/read - تعليم الحوار بأنه مقروء
GET    /api/messages/unread-count      - عدد الرسائل غير المقروءة
```

#### لوحة التحكم (Dashboard)
```
GET    /api/dashboard/stats            - إحصائيات المستخدم
GET    /api/dashboard/activity         - الأنشطة الأخيرة
GET    /api/dashboard/active-projects  - المشاريع النشطة
GET    /api/dashboard/pending-proposals- العروض المعلقة
GET    /api/dashboard/financial        - الإحصائيات المالية

GET    /api/admin/stats                - إحصائيات الإدارة
GET    /api/admin/users                - قائمة المستخدمين
GET    /api/admin/projects             - قائمة المشاريع
GET    /api/admin/payments             - قائمة الدفعات
```

#### الدفعات والتحويلات (Payments)
```
GET    /api/payments                   - السجل المالي
GET    /api/withdrawals                - طلبات السحب
POST   /api/withdrawals                - طلب سحب جديد
GET    /api/wallet                     - المحفظة
```

#### المستخدمون (Users)
```
GET    /api/freelancers                - قائمة المستقلين
GET    /api/freelancers/:id            - ملف المستقل
GET    /api/freelancers/:id/reviews    - مراجعات المستقل
GET    /api/users/:id                  - بيانات المستخدم
```

## 📊 بنية البيانات

### المستخدم (User)
```javascript
{
    id: string,
    name: string,
    email: string,
    phone: string,
    type: 'freelancer' | 'employer',
    avatar: string,
    bio: string,
    skills: string[],
    rating: number,
    completedProjects: number,
    createdAt: string,
    updatedAt: string,
    active: boolean
}
```

### المشروع (Project)
```javascript
{
    id: string,
    title: string,
    description: string,
    category: string,
    budget: number,
    budget_type: 'fixed' | 'hourly',
    skills: string[],
    status: 'open' | 'in_progress' | 'completed' | 'cancelled',
    client: User,
    proposals_count: number,
    deadline: string,
    createdAt: string,
    updatedAt: string
}
```

### العرض (Proposal)
```javascript
{
    id: string,
    project_id: string,
    freelancer_id: string,
    amount: number,
    timeline: number,
    message: string,
    status: 'pending' | 'accepted' | 'rejected',
    createdAt: string,
    updatedAt: string
}
```

### الرسالة (Message)
```javascript
{
    id: string,
    conversation_id: string,
    sender_id: string,
    content: string,
    read: boolean,
    createdAt: string
}
```

### الدفعة (Payment)
```javascript
{
    id: string,
    transactionId: string,
    user_id: string,
    amount: number,
    method: 'card' | 'bank' | 'wallet',
    status: 'pending' | 'completed' | 'failed' | 'refunded',
    createdAt: string,
    updatedAt: string
}
```

## 🛠️ الوحدات (Modules)

### AuthModule
```javascript
AuthModule.login(email, password)           // تسجيل الدخول
AuthModule.register(userData)               // التسجيل
AuthModule.logout()                         // تسجيل الخروج
AuthModule.isAuthenticated()                // فحص التوثيق
AuthModule.getToken()                       // الحصول على التوكن
AuthModule.getUser()                        // بيانات المستخدم
AuthModule.updateProfile(userData)          // تحديث الملف
AuthModule.changePassword(old, new)         // تغيير كلمة المرور
AuthModule.requestPasswordReset(email)      // نسيان كلمة المرور
```

### AppModule
```javascript
AppModule.apiRequest(endpoint, options)     // طلب API موحد
AppModule.redirectIfNotAuthenticated(url)   // الذهاب لصفحة التسجيل
AppModule.showSuccess(message)              // رسالة نجاح
AppModule.showError(message)                // رسالة خطأ
AppModule.showInfo(message)                 // رسالة معلومات
AppModule.formatDate(date, locale)          // تنسيق التاريخ
AppModule.formatCurrency(amount, currency)  // تنسيق العملة
AppModule.validateEmail(email)              // التحقق من البريد
AppModule.loadComponent(path)               // تحميل مكون
AppModule.createElementFromHTML(html)       // تحويل HTML للـ DOM
```

### ProjectsModule
```javascript
ProjectsModule.getProjects(filters)         // الحصول على المشاريع
ProjectsModule.getProjectDetails(id)        // تفاصيل المشروع
ProjectsModule.createProject(data)          // إنشاء مشروع
ProjectsModule.updateProject(id, data)      // تحديث المشروع
ProjectsModule.deleteProject(id)            // حذف المشروع
ProjectsModule.getMyProjects(status)        // مشاريعي
ProjectsModule.submitProposal(id, data)     // تقديم عرض
ProjectsModule.getProjectProposals(id)      // عروض المشروع
ProjectsModule.getMyProposals(status)       // عروضي
ProjectsModule.acceptProposal(id)           // قبول العرض
ProjectsModule.rejectProposal(id)           // رفض العرض
ProjectsModule.changeProjectStatus(id, st)  // تغيير الحالة
```

### ChatModule
```javascript
ChatModule.getConversations(page, limit)    // الحوارات
ChatModule.getMessages(convId, page)        // الرسائل
ChatModule.sendMessage(convId, message)     // إرسال رسالة
ChatModule.startConversation(userId)        // بدء حوار
ChatModule.deleteConversation(convId)       // حذف الحوار
ChatModule.markAsRead(convId)               // تعليم بأنه مقروء
ChatModule.getUnreadCount()                 // عدد غير المقروء
```

### DashboardModule
```javascript
DashboardModule.getUserStats()              // إحصائيات المستخدم
DashboardModule.getRecentActivity(limit)    // الأنشطة الأخيرة
DashboardModule.getActiveProjects()         // المشاريع النشطة
DashboardModule.getPendingProposals()       // العروض المعلقة
DashboardModule.getFinancialStats()         // الإحصائيات المالية
DashboardModule.getAdminStats()             // إحصائيات الإدارة
DashboardModule.getUsers(page, limit)       // قائمة المستخدمين
DashboardModule.getAllProjects(page, limit) // قائمة المشاريع
DashboardModule.getPayments(page, limit)    // قائمة الدفعات
```

## 🎨 التصميم والأساليب

### متغيرات CSS (CSS Variables)
تم تعريف المتغيرات التالية في stylesheet:
```css
--primary-color: #007bff
--secondary-color: #6c757d
--success-color: #28a745
--danger-color: #dc3545
--warning-color: #ffc107
--info-color: #17a2b8
```

### الفئات المساعدة (Utility Classes)
```html
<!-- نصوص -->
<p class="text-primary">النص الأساسي</p>

<!-- الخلفيات -->
<div class="bg-light">خلفية فاتحة</div>

<!-- الظلال -->
<div class="shadow-sm">ظل صغير</div>

<!-- المسافات -->
<div class="p-3 m-2">حشو وهامش</div>

<!-- التعريضات -->
<div class="d-flex justify-content-between">مرن</div>
```

## 📱 التصميم المتجاوب

المنصة مدعومة بالكامل للأجهزة المختلفة:
- ** الهواتف الذكية** (تحت 576px)
- ** الأجهزة اللوحية** (576px - 768px)
- **شاشات سطح المكتب** (أكبر من 768px)

## 🚀 البدء

### 1. الإعدادات الأساسية
```javascript
// تأكد من أن authToken موجود في localStorage
localStorage.setItem('authToken', 'your_jwt_token_here');
```

### 2. تحميل الصفحات
```html
<script src="assets/js/auth.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/projects.js"></script>
<script src="assets/js/chat.js"></script>
<script src="assets/js/dashboard.js"></script>
```

### 3. التحقق من المصادقة
```javascript
document.addEventListener('DOMContentLoaded', () => {
    AppModule.redirectIfNotAuthenticated('login.html');
    // بقية الكود
});
```

## 🔒 الأمان

### التوصيات:
1. **HTTPS فقط** - استخدم HTTPS في الإنتاج
2. **CORS** - قم بتعريف CORS بشكل صحيح
3. **Validation** - تحقق من البيانات على جانب الـ Server
4. **Token Expiration** - اسمح انتهاء صلاحية التوكن
5. **Rate Limiting** - حدد معدل الطلبات

## 📝 ملاحظات للمطورين

### رسائل الخطأ
يتم عرض الأخطاء تلقائياً عبر `AppModule.showError()`:
```javascript
try {
    const result = await ProjectsModule.getProjects();
} catch (error) {
    AppModule.showError(error.message);
}
```

### تنسيقات التاريخ والعملات
```javascript
// التواريخ
AppModule.formatDate('2024-01-15', 'ar-SA'); // 15 يناير 2024

// العملات
AppModule.formatCurrency(1500, 'SAR'); // 1,500.00 ر.س
```

### تحميل المكونات
```javascript
// تحميل navbar من components
const navbarHTML = await AppModule.loadComponent('components/navbar.html');
document.getElementById('navbar').innerHTML = navbarHTML;
```

## 🐛 استكشاف الأخطاء

### فحص التوكن
```javascript
console.log(localStorage.getItem('authToken'));
```

### فحص الأخطاء في Server
تحقق من الـ Network tab في Developer Tools

### State Management
جميع الحالات يتم حفظها في localStorage للتوكن والمستخدم

## 📞 الدعم

للمزيد من المعلومات، راجع التعليقات في الملفات أو تواصل مع فريق التطوير.

---

**تم الإنشاء**: 2024
**الإصدار**: 1.0
**الترخيص**: جميع الحقوق محفوظة
