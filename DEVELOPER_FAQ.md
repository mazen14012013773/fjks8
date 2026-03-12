# الأسئلة الشائعة للمطورين (Developer FAQ)

## 🚀 البدء والتثبيت

### س: كيف أبدأ بتطوير المشروع؟
**ج:** 
1. استنسخ المستودع
2. انسخ `.env.example` إلى `.env`
3. عدّل إعدادات الـ API في الملف
4. شغّل ملف server محلي (Python HTTP Server أو Live Server)
5. افتح المتصفح وتصفح الموقع

```bash
# مثال
git clone <repo-url>
cd freelance-platform
cp .env.example .env
python -m http.server 8000
# ثم افتح http://localhost:8000
```

---

### س: لا أملك خادم إلى الآن، كيف أختبر الموقع؟
**ج:** استخدم بيانات وهمية محليًا:

```javascript
// في أي صفحة، أضف هذا في console
const mockToken = 'mock-token-123';
const mockUser = {
    id: '1',
    name: 'Ahmed Test',
    email: 'test@example.com',
    type: 'freelancer'
};

localStorage.setItem('authToken', mockToken);
localStorage.setItem('authUser', JSON.stringify(mockUser));

// ثم احدّث الصفحة
location.reload();
```

---

## 🔌 التكامل مع الـ Backend

### س: كيف أوصل الـ Frontend بـ Backend؟
**ج:**
1. تأكد أن Backend يعمل على النفس الـ port (أو مختلف مع CORS صحيح)
2. حدّث `config.js` بـ API URL الصحيح
3. جميع الوحدات ستستخدم `AppModule.apiRequest()` تلقائيًا

```javascript
// في assets/js/config.js
const API_CONFIG = {
    development: {
        baseURL: 'http://localhost:3000/api', // غيّر هنا
        timeout: 30000,
        enableLogging: true
    },
    // ...
};
```

---

### س: ما صيغة الاستجابة من الـ Backend؟
**ج:** يجب أن تكون الاستجابة بهذا الشكل:

```javascript
// عند النجاح
{
    "ok": true,
    "data": {
        // البيانات المطلوبة
    }
}

// عند الفشل
{
    "ok": false,
    "error": "وصف الخطأ"
}
```

---

### س: هل يمكن استخدام API endpoints مختلفة؟
**ج:** نعم، عدّل `Config.endpoints` في `config.js`:

```javascript
Config.endpoints = {
    auth: {
        login: '/auth/signin', // بدلاً من /auth/login
        // ...
    },
    // ...
};
```

---

## 🔐 المصادقة والتوكن

### س: كيف يعمل نظام المصادقة؟
**ج:**
1. المستخدم يسجل دخول بالبريد وكلمة المرور
2. Server يعيد JWT token
3. Frontend يحفظه في `localStorage` تحت مفتاح `authToken`
4. جميع الطلبات اللاحقة تشمل الـ token في الـ header

```
Authorization: Bearer <token>
```

---

### س: ماذا لو انقضى التوكن (expired)؟
**ج:** الـ Frontend يكتشفها تلقائيًا:

```javascript
// في AppModule.apiRequest()
if (response.status === 401) {
    // التوكن منتهي
    AuthModule.logout();
    window.location.href = 'login.html';
}
```

---

### س: كيف أعيد تعيين كلمة المرور؟
**ج:**
1. المستخدم يدخل بريده في `forgot-password.html`
2. Backend يرسل رابط reset في البريد
3. المستخدم ينقر الرابط
4. يدخل كلمة مرور جديدة

```javascript
// في Backend (مثال)
router.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    const token = generateResetToken();
    // احفظ الـ token مع انتهاء الصلاحية
    // أرسل البريد مع الرابط
});
```

---

## 📱 التصميم والـ Responsive

### س: لماذا الموقع RTL (من اليمين لليسار)؟
**ج:** يدعم اللغة العربية. استخدم `dir="rtl"` في الـ HTML.

---

### س: كيف أعدّل الألوان والأساليب؟
**ج:** استخدم متغيرات CSS في `style.css`:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    /* ... */
}

/* استخدم المتغيرات */
.btn-primary {
    background-color: var(--primary-color);
}
```

---

### س: كيف أختبر الموقع على أجهزة مختلفة؟
**ج:**
1. افتح Browser DevTools (F12)
2. اضغط Ctrl+Shift+M لـ Device Emulation
3. اختر الجهاز من القائمة

أو استخدم أدوات مثل:
- [BrowserStack](https://www.browserstack.com/)
- [Responsively App](https://responsively.app/)

---

## 📊 البيانات والنماذج

### س: كيف أرسل بيانات النموذج للـ Server؟
**ج:**

```javascript
document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const project = Object.fromEntries(formData);
    
    const result = await ProjectsModule.createProject(project);
    if (result.ok) {
        AppModule.showSuccess('تم الإنشاء بنجاح');
    } else {
        AppModule.showError(result.error);
    }
});
```

---

### س: كيف أعرض البيانات الديناميكية؟
**ج:**

```javascript
async function loadProjects() {
    const result = await ProjectsModule.getProjects();
    if (result.ok) {
        displayProjects(result.data.projects);
    }
}

function displayProjects(projects) {
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="card">
                <h5>${project.title}</h5>
                <p>${project.description}</p>
            </div>
        `;
    });
    document.getElementById('projects-container').innerHTML = html;
}
```

---

## 🐛 استكشاف الأخطاء

### س: أرى خطأ CORS في الـ Console. ماذا أفعل؟
**ج:** تأكد أن Backend يسمح بـ requests من Frontend:

```javascript
// في Backend (Express مثال)
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true
}));
```

---

### س: الـ API غير يستجيب. كيف أتحقق؟
**ج:**
1. افتح Network tab في DevTools (F12)
2. أعد تحميل الصفحة
3. ابحث عن الطلب الفاشل
4. انقر عليه وشاهد الـ Response

```javascript
// أو استخدم fetch مباشرة في console
fetch('http://localhost:3000/api/projects')
    .then(r => r.json())
    .then(d => console.log(d))
    .catch(e => console.error(e));
```

---

### س: البيانات لا تُحفظ عند تحديث الصفحة؟
**ج:** البيانات تُحفظ في localStorage فقط:
- authToken
- authUser

البيانات الأخرى تحتاج Refresh من Server:

```javascript
// لتحفظ بيانات إضافية
localStorage.setItem('myData', JSON.stringify(data));

// واسترجعها
const data = JSON.parse(localStorage.getItem('myData'));
```

---

## 🎯 الأداء والتحسين

### س: الصفحة بطيئة. كيف أحسنها؟
**ج:**
1. استخدم lazy loading للصور
2. اضغط CSS و JavaScript
3. استخدم caching للبيانات الثابتة

```javascript
// مثال caching بسيط
let cachedProjects = null;

async function getProjects() {
    if (cachedProjects) {
        return cachedProjects;
    }
    const result = await ProjectsModule.getProjects();
    cachedProjects = result.data;
    return result;
}
```

---

### س: كيف أختبر أداء الموقع؟
**ج:** استخدم:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Chrome DevTools (Lighthouse tab)

---

## 📚 الوثائق والتعليقات

### س: أين أجد شرح الدوال؟
**ج:** كل دالة موثقة باستخدام JSDoc:

```javascript
/**
 * شرح الدالة
 * @param {type} param1 - شرح المعامل
 * @returns {type} شرح القيمة
 */
function myFunction(param1) {
    // ...
}
```

اقرأ التعليقات في الملفات أو check README.md

---

### س: كيف أضيف دالة جديدة مع توثيق؟
**ج:**

```javascript
/**
 * حساب إجمالي سعر العروض
 * @param {Array<Object>} proposals - قائمة العروض
 * @param {number} proposals[].amount - السعر 
 * @returns {number} الإجمالي
 * @example
 * calculateTotal([{amount: 100}, {amount: 200}]); // 300
 */
function calculateTotal(proposals) {
    return proposals.reduce((sum, p) => sum + p.amount, 0);
}
```

---

## 🔄 إدارة الشيفرة والـ Git

### س: كيف أرفع كود جديد بشكل صحيح؟
**ج:**

```bash
# 1. أنشئ فرع جديد
git checkout -b feature/new-feature

# 2. اعمل على الميزة
# ... اكتب الكود ...

# 3. أضف التغييرات
git add .

# 4. اكتب رسالة واضحة
git commit -m "إضافة ميزة جديدة: شرح"

# 5. ارفع للخادم
git push origin feature/new-feature

# 6. افتح Pull Request
```

---

### س: ماذا لو غيرت شيء بطريق الخطأ؟
**ج:**

```bash
# إرجاع ملف واحد
git checkout filename

# إرجاع جميع التغييرات
git reset --hard HEAD

# إرجاع commit قديم
git revert commit-hash
```

---

## 🚢 النشر والإطلاق

### س: كيف أنشر الموقع على الأنترنت؟
**ج:** خيارات متعددة:

**Netlify (الأسهل)**:
1. ربط GitHub مع Netlify
2. سيتم النشر تلقائيًا مع كل push

**GitHub Pages**:
```bash
git add .
git commit -m "Deploy"
git push origin main
```

**خادم خاص**:
```bash
scp -r . user@server:/var/www/freelancehub
```

---

### س: ماذا لو كان لدينا عدة بيئات (dev, staging, prod)؟
**ج:** استخدم `.env` مختلفة:

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.staging
VITE_API_BASE_URL=https://staging-api.freelancehub.com/api

# .env.production
VITE_API_BASE_URL=https://api.freelancehub.com/api
```

وحدّث `config.js` لديك اختيار ENV

---

## 📞 الدعم والمساعدة

### س: عندي مشكلة لا أستطيع حلها. ماذا أفعل؟
**ج:**
1. ابحث في FAQ هنا
2. اقرأ Documentation
3. فتح issue على GitHub
4. تواصل مع الفريق

---

### س: كيف أبلغ عن خطأ (Bug Report)؟
**ج:** افتح issue على GitHub مع:
- شرح الخطأ
- خطوات لتكراره
- الـ Browser والـ OS
- لقطات شاشة

```markdown
# Bug: اسم البق
## الوصف
شرح المشكلة

## خطوات التكرار
1. افتح الصفحة
2. انقر على ...
3. شاهد الخطأ

## النتيجة المتوقعة
ما كان يجب أن يحدث

## النتيجة الفعلية
ما حدث فعلاً

## البيئة
- Browser: Chrome 120
- OS: Windows 11
```

---

### س: أريد اقتراح ميزة جديدة؟
**ج:** افتح issue من نوع "Enhancement":

```markdown
# Enhancement: اسم الميزة
## الوصف
شرح الميزة وفائدتها

## الفائدة
لماذا نضيفها؟

## مثال
كيف ستعمل؟
```

---

## 🎓 موارد تعليمية

### س: أين أتعلم JavaScript؟
**ج:** موارد مفيدة:
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [FreeCodeCamp](https://www.freecodecamp.org/)

### س: هل هناك مسار تعليمي للمشروع؟
**ج:** نعم، ابدأ هنا:
1. اقرأ README.md
2. اقرأ DEVELOPMENT.md
3. ادرس CODE_GUIDELINES.md
4. لعب مع الكود

---

## ⚡ نصائح سريعة

```javascript
// سجل الأخطاء بسهولة
Console.error() // بدلاً من console.log()

// اختبر وظائف بسرعة
AppModule.showSuccess('رسالة تجربة');

// احصل على بيانات الاختبار
localStorage.getItem('authToken')

// امسح البيانات إذا علقت
localStorage.clear()
```

---

**آخر تحديث**: 2024
**تم الإجابة على**: 50+ سؤال
