# دليل إعداد Backend API

## 📋 المتطلبات

- Node.js v14 أو أعلى
- MongoDB (محلي أو سحابي)
- npm أو yarn
- Git

## 🚀 خطوات التثبيت

### 1. استنساخ المستودع
```bash
git clone <repository-url>
cd freelance-backend
```

### 2. تثبيت المتطلبات
```bash
npm install
```

سيتم تثبيت المكتبات التالية:
- **express** - خادم الويب
- **mongoose** - ORM لـ MongoDB
- **bcryptjs** - تشفير كلمات المرور
- **jsonwebtoken** - توليد التوكنات
- **cors** - الاتصالات البيني (CORS)
- **dotenv** - متغيرات البيئة
- **express-validator** - التحقق من المدخلات
- **multer** - رفع الملفات
- **nodemailer** - إرسال البريد الإلكتروني
- **nodemon** (dev) - إعادة تحميل تلقائية

### 3. إنشاء ملف .env
```bash
cp .env.example .env
```

### 4. تحديث متغيرات البيئة
قم بتعديل ملف `.env` بالمعلومات الصحيحة:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/freelancedb
# أو لـ MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/freelancedb

# JWT Authentication
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=24h

# Frontend URL
FRONTEND_URL=http://localhost:8000

# Email Configuration (إذا أردت إرسال بريد إلكتروني)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment Gateway (Stripe)
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Platform Configuration
COMMISSION_RATE=0.10
MIN_PROJECT_BUDGET=50
MAX_PROJECT_BUDGET=100000
```

### 5. إعداد قاعدة البيانات MongoDB

#### إذا كنت تستخدم MongoDB محلي:
```bash
# بدء MongoDB
mongod
```

#### أو استخدم MongoDB Atlas (السحابي):
1. اذهب إلى https://www.mongodb.com/cloud/atlas
2. أنشئ حساب مجاني
3. أنشئ cluster
4. احصل على connection string
5. ضعها في متغير `MONGODB_URI`

### 6. بدء الخادم

#### للتطوير (مع إعادة تحميل تلقائية):
```bash
npm run dev
```

#### للإنتاج:
```bash
npm start
```

ستظهر رسالة عند بدء الخادم:
```
╔════════════════════════════════════╗
║   FreelanceHub Backend Server      ║
║   Running on port 3000             ║
║   Environment: development         ║
╚════════════════════════════════════╝
```

## ✅ اختبار الخادم

### Health Check
```bash
curl http://localhost:3000/api/health
```

يجب أن تحصل على:
```json
{
  "ok": true,
  "message": "Server is running"
}
```

### تسجيل الدخول (مثال)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📁 هيكل المشروع

```
freelance-backend/
├── routes/              # API endpoints
│   ├── auth.js         # المصادقة
│   ├── projects.js     # المشاريع
│   ├── messages.js     # الرسائل
│   ├── payments.js     # الدفعات
│   ├── users.js        # المستخدمون
│   ├── dashboard.js    # لوحة التحكم
│   └── admin.js        # الإدارة
├── controllers/        # منطق الأعمال
├── models/            # Mongoose schemas
├── middleware/        # Middleware functions
├── config/            # Configuration
├── server.js          # Main entry point
├── package.json       # Dependencies
├── .env.example       # Environment template
└── README.md          # Documentation
```

## 🔐 نقاط الأمان

1. **JWT Secret**: غير `JWT_SECRET` في الإنتاج
2. **CORS**: تأكد من تحديث `FRONTEND_URL`
3. **Database**: استخدم كلمات مرور قوية
4. **Environment Variables**: لا ترفع `.env` على Git
5. **Rate Limiting**: فكر في إضافة rate limiting في الإنتاج

## 🐛 استكشاف الأخطاء

### الخادم لا يبدأ
```bash
# تحقق من أن PORT مجاني
lsof -i :3000

# أو استخدم port مختلف
PORT=3001 npm run dev
```

### خطأ في الاتصال بـ MongoDB
```bash
# تحقق من أن MongoDB يعمل
mongo --eval "db.version()"

# أو تحقق من connection string
echo $MONGODB_URI
```

### خطأ في JWT
```bash
# تأكد من وجود JWT_SECRET في .env
grep JWT_SECRET .env
```

## 📚 الموارد الإضافية

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 📞 الدعم

إذا واجهت مشاكل، تحقق من:
1. ملف `server.js` للمزيد من التفاصيل
2. لوحة MongoDB للتحقق من البيانات
3. متغيرات البيئة في `.env`

تم التطوير بواسطة: **مازن محمد**
