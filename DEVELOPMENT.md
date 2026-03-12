# دليل التطوير - FreelanceHub Platform

## 📚 جدول المحتويات
1. [المتطلبات](#المتطلبات)
2. [التثبيت](#التثبيت)
3. [البدء السريع](#البدء-السريع)
4. [هيكل المشروع](#هيكل-المشروع)
5. [تطوير الـ Backend](#تطوير-الـ-backend)
6. [تطوير الـ Frontend](#تطوير-الـ-frontend)
7. [الاختبار](#الاختبار)
8. [النشر](#النشر)

---

## المتطلبات

### للـ Frontend
- **المتصفح الحديث**: Chrome, Firefox, Safari, Edge
- **محرر النصوص**: VS Code أو أي محرر آخر
- **أدوات التطوير**: Git, Node.js (اختياري للأدوات)

### للـ Backend (Node.js/Express مثال)
- **Node.js**: النسخة 14 أو أحدث
- **npm** أو **yarn**
- **قاعدة البيانات**: PostgreSQL أو MongoDB
- **Postman** أو **Insomnia**: لاختبار الـ API

---

## التثبيت

### 1. استنساخ المستودع
```bash
git clone https://github.com/your-org/freelance-platform.git
cd freelance-platform
```

### 2. إعداد ملف البيئة
```bash
# انسخ ملف المثال
cp .env.example .env

# عدّل البيانات حسب بيئتك
nano .env
```

### 3. تثبيت الاعتماديات (إذا كنت تستخدم مع Backend)
```bash
# إذا كان لديك ملف package.json
npm install
```

---

## البدء السريع

### تشغيل الـ Frontend فقط (بدون Backend)
```bash
# استخدم Live Server في VS Code أو أي server محلي
# أو افتح الملف مباشرة في المتصفح

# مثال باستخدام Python
python -m http.server 8000

# أو باستخدام Node.js
npx http-server
```

### تشغيل مع Backend محلي
```bash
# في terminal أول - Backend
cd backend
npm install
npm run dev

# في terminal ثاني - Frontend
cd freelance-platform
npm run dev  # إذا كان لديك script في package.json
```

### التحقق من التشغيل
- افتح المتصفح وانتقل إلى: `http://localhost:8000`
- يجب أن ترى الصفحة الرئيسية

---

## هيكل المشروع

```
freelance-platform/
├── index.html                    # الصفحة الرئيسية
├── login.html, register.html     # صفحات المصادقة
├── dashboard.html                # لوحة المستخدم
├── admin/                        # لوحة التحكم
│   ├── dashboard.html
│   ├── users.html
│   ├── projects.html
│   └── payments.html
├── components/                   # مكونات HTML معاد استخدامها
│   ├── navbar.html
│   ├── footer.html
│   └── sidebar.html
├── assets/
│   ├── css/
│   │   ├── style.css             # الأساليب الرئيسية
│   │   └── responsive.css        # التصميم المتجاوب
│   ├── js/
│   │   ├── config.js             # إعدادات API
│   │   ├── auth.js               # وحدة المصادقة
│   │   ├── main.js               # الوحدة الرئيسية
│   │   ├── projects.js           # وحدة المشاريع
│   │   ├── chat.js               # وحدة الدردشة
│   │   └── dashboard.js          # وحدة لوحة التحكم
│   └── images/                   # الصور
├── README.md                     # دليل المستخدم
├── DEVELOPMENT.md                # هذا الملف
├── .env.example                  # مثال متغيرات البيئة
└── .gitignore                    # ملفات Git المتجاهلة
```

---

## تطوير الـ Backend

### 1. إنشاء مشروع Node.js/Express

```bash
mkdir freelance-backend
cd freelance-backend
npm init -y
npm install express cors dotenv mongoose jsonwebtoken bcrypt
npm install -D nodemon
```

### 2. بنية ملف Server الأساسي

```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/admin', require('./routes/admin'));

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ ok: false, error: 'خطأ في الخادم' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### 3. مثال روت المصادقة

```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // تحقق من المستخدم في قاعدة البيانات
        // const user = await User.findOne({ email });
        // if (!user || !await bcrypt.compare(password, user.password)) {
        //     return res.status(401).json({ ok: false, error: 'بيانات غير صحيحة' });
        // }

        // إنشاء JWT Token
        const token = jwt.sign(
            { userId: 'user_id', email: email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            ok: true,
            data: {
                token,
                user: {
                    id: 'user_id',
                    name: 'User Name',
                    email: email,
                    type: 'freelancer'
                }
            }
        });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

module.exports = router;
```

### 4. Middleware للمصادقة

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ ok: false, error: 'توكن مفقود' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ ok: false, error: 'توكن غير صحيح' });
    }
};

module.exports = authMiddleware;
```

### 5. مثال روت المشاريع

```javascript
// routes/projects.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// الحصول على المشاريع
router.get('/', async (req, res) => {
    try {
        // const projects = await Project.find();
        const projects = []; // بيانات وهمية للاختبار
        
        res.json({
            ok: true,
            data: { projects }
        });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

// إنشاء مشروع
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, budget, category } = req.body;
        
        // const project = new Project({
        //     title, description, budget, category,
        //     client: req.user.userId
        // });
        // await project.save();

        res.status(201).json({
            ok: true,
            data: { message: 'تم إنشاء المشروع بنجاح' }
        });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

module.exports = router;
```

### 6. متغيرات البيئة للـ Backend

```env
# .env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
DATABASE_URL=mongodb://localhost:27017/freelance-platform
CORS_ORIGIN=http://localhost:8000
```

---

## تطوير الـ Frontend

### 1. العمل مع الوحدات (Modules)

كل وحدة معزولة وتحتوي على وظائفها الخاصة:

```javascript
// مثال: استخدام ProjectsModule
const projects = await ProjectsModule.getProjects({ 
    category: 'web',
    status: 'open'
});

if (projects.ok) {
    console.log(projects.data);
} else {
    console.error(projects.error);
}
```

### 2. إضافة ميزة جديدة

#### أ. إنشاء صفحة HTML جديدة
```html
<!-- new-feature.html -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>ميزة جديدة</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div id="navbarContainer"></div>
    <main class="p-4">
        <!-- محتوى الصفحة -->
    </main>
    <div id="footerContainer"></div>

    <script src="assets/js/auth.js"></script>
    <script src="assets/js/main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            AppModule.redirectIfNotAuthenticated('login.html');
            
            // تحميل المكونات
            const navbar = await AppModule.loadComponent('components/navbar.html');
            document.getElementById('navbarContainer').innerHTML = navbar;
            
            // تحميل البيانات
            loadFeatureData();
        });

        async function loadFeatureData() {
            // استدعاء الـ API
        }
    </script>
</body>
</html>
```

#### ب. إنشاء وحدة JavaScript جديدة
```javascript
// assets/js/feature.js
const FeatureModule = (() => {
    const baseURL = Config.getBaseURL();

    return {
        getFeatureData: async (id) => {
            try {
                return await AppModule.apiRequest(
                    `${Config.endpoints.features.list}/${id}`,
                    { method: 'GET' }
                );
            } catch (error) {
                return { ok: false, error: error.message };
            }
        },

        createFeature: async (data) => {
            try {
                return await AppModule.apiRequest(
                    Config.endpoints.features.create,
                    {
                        method: 'POST',
                        body: JSON.stringify(data)
                    }
                );
            } catch (error) {
                return { ok: false, error: error.message };
            }
        }
    };
})();
```

### 3. اختبار الـ Frontend

#### قبل توصيل الـ Backend، استخدم mock data:

```javascript
// في مرحلة التطوير
const mockProjects = [
    { id: 1, title: 'تطوير موقع ويب', budget: 5000, status: 'open' },
    { id: 2, title: 'تصميم لوجو', budget: 1000, status: 'open' }
];

// استبدل calls الـ API بـ return للـ mock data
```

---

## الاختبار

### 1. اختبار الـ API يدويًا

استخدم Postman أو Insomnia:

```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

### 2. اختبار الـ Frontend في المتصفح

فتح Developer Tools (F12):

```javascript
// اختبر وحدة المصادقة
console.log(AuthModule.isAuthenticated());
console.log(AuthModule.getUser());

// اختبر طلب API
AppModule.apiRequest('/projects').then(result => {
    console.log(result);
});
```

### 3. اختبار الاستجابة (Responsive)

- اضغط F12 وفعل Device Emulation
- اختبر على أحجام مختلفة: 320px, 768px, 1024px

---

## النشر

### 1. تحضير الإنتاج

```bash
# تحديث ملف .env للإنتاج
VITE_API_BASE_URL=https://api.freelancehub.com/api
VITE_ENV=production
```

### 2. نشر الـ Frontend

#### على GitHub Pages:
```bash
git add .
git commit -m "Deployment"
git push origin main
```

#### على Netlify:
```bash
# ربط الـ GitHub مع Netlify
# سيتم النشر تلقائيًا مع كل push
```

#### على خادم خاص:
```bash
# رفع الملفات عبر FTP أو SCP
scp -r . user@server:/var/www/freelancehub
```

### 3. نشر الـ Backend

```bash
# على Heroku
heroku create my-freelance-api
git push heroku main

# على DigitalOcean / AWS
# أتبع إرشادات الخدمة
```

### 4. إعدادات الـ CORS للإنتاج

في Server.js:
```javascript
app.use(cors({
    origin: 'https://freelancehub.com',
    credentials: true,
    optionsSuccessStatus: 200
}));
```

---

## نصائح مفيدة

### ✅ أفضل الممارسات

1. **استخدم Git**: تتبع التغييرات مع Git
   ```bash
   git add .
   git commit -m "وصف التغييرات"
   git push
   ```

2. **الأمان**:
   - لا تشارك `.env`
   - استخدم HTTPS فقط
   - تحقق من صحة البيانات

3. **الأداء**:
   - استخدم lazy loading للصور
   - ضغط CSS و JavaScript
   - استخدم caching

4. **التوثيق**:
   - اكتب تعليقات واضحة
   - وثق الـ APIs
   - احفظ تغييرات مهمة في الـ Changelog

### 🐛 حل المشاكل الشائعة

**المشكلة**: CORS Error
```
الحل: تأكد أن Backend يسمح بـ requests من Frontend
```

**المشكلة**: 404 Not Found للـ API
```
الحل: فحص الـ URL في config.js
```

**المشكلة**: Token Expired
```
الحل: أعد تسجيل الدخول وسيتم إنشاء token جديد
```

---

## الدعم والمساعدة

- 📖 [دليل المستخدم](README.md)
- 💬 [تواصل معنا](contact.html)
- 🐛 [إبلاغ عن مشكلة](https://github.com/your-org/freelance-platform/issues)

---

**آخر تحديث**: 2024
**النسخة**: 1.0
