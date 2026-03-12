# API Endpoints Documentation

## نظرة عامة

منصة العمل الحرة تحتوي على عدة مجموعات من API endpoints. جميع الطلبات يجب أن تكون JSON.

### Base URL
```
http://localhost:3000/api
```

### Authentication
معظم الـ endpoints تتطلب JWT token. أرسل التوكن في الـ header:
```
Authorization: Bearer <your_token_here>
```

---

## 🔐 Authentication Endpoints

### 1. تسجيل الدخول
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "ok": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "user_id",
      "name": "أحمد",
      "email": "user@example.com",
      "type": "freelancer",
      "avatar": "url"
    }
  }
}
```

### 2. التسجيل الجديد
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "محمد أحمد",
  "email": "new@example.com",
  "password": "password123",
  "type": "freelancer"
}
```

**Response (201):**
```json
{
  "ok": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "new_id",
      "name": "محمد أحمد",
      "email": "new@example.com",
      "type": "freelancer"
    }
  }
}
```

### 3. تحديث الملف الشخصي
```
PUT /auth/profile
```
**يتطلب:** Authentication

**Request Body:**
```json
{
  "name": "محمد أحمد",
  "phone": "0501234567",
  "bio": "مطور ويب ماهر",
  "title": "Senior Web Developer",
  "skills": ["HTML", "CSS", "JavaScript"]
}
```

### 4. تغيير كلمة المرور
```
POST /auth/change-password
```
**يتطلب:** Authentication

**Request Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password_123"
}
```

### 5. نسيان كلمة المرور
```
POST /auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

---

## 📂 Projects Endpoints

### 1. الحصول على المشاريع
```
GET /projects?status=open&category=web&page=1&limit=10
```

**Query Parameters:**
- `status` - حالة المشروع (open, in_progress, completed)
- `category` - فئة المشروع (web, mobile, design, writing, marketing)
- `search` - البحث بـ العنوان
- `page` - رقم الصفحة (default: 1)
- `limit` - عدد النتائج (default: 10)

**Response (200):**
```json
{
  "ok": true,
  "data": {
    "projects": [...],
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
```

### 2. الحصول على تفاصيل المشروع
```
GET /projects/:id
```

### 3. إنشاء مشروع جديد
```
POST /projects
```
**يتطلب:** Authentication (employer)

**Request Body:**
```json
{
  "title": "تطوير موقع ويب",
  "description": "موقع تجارة إلكترونية متكامل",
  "category": "web",
  "budget": 5000,
  "budget_type": "fixed",
  "skills": ["HTML", "CSS", "JavaScript", "React"],
  "deadline": "2024-03-31"
}
```

### 4. تحديث المشروع
```
PUT /projects/:id
```
**يتطلب:** Authentication (owner)

### 5. حذف المشروع
```
DELETE /projects/:id
```
**يتطلب:** Authentication (owner)

### 6. تقديم عرض على المشروع
```
POST /projects/:id/proposals
```
**يتطلب:** Authentication (freelancer)

**Request Body:**
```json
{
  "amount": 4500,
  "timeline": 7,
  "message": "يمكنني إنجاز هذا المشروع بكفاءة عالية"
}
```

### 7. الحصول على عروض المشروع
```
GET /projects/:id/proposals
```
**يتطلب:** Authentication (owner)

---

## 💬 Messages Endpoints

### 1. الحصول على المحادثات
```
GET /messages/conversations?page=1&limit=10
```
**يتطلب:** Authentication

### 2. الحصول على رسائل محادثة
```
GET /messages/conversations/:id?page=1&limit=20
```
**يتطلب:** Authentication

### 3. إرسال رسالة
```
POST /messages/conversations/:id
```
**يتطلب:** Authentication

**Request Body:**
```json
{
  "content": "مرحباً، هل أنت متوفر؟"
}
```

### 4. بدء محادثة جديدة
```
POST /messages/conversations
```
**يتطلب:** Authentication

**Request Body:**
```json
{
  "userId": "user_id_to_chat_with"
}
```

### 5. عدد الرسائل غير المقروءة
```
GET /messages/unread-count
```
**يتطلب:** Authentication

---

## 👥 Users Endpoints

### 1. الحصول على بيانات المستخدم
```
GET /users/:id
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "أحمد محمود",
      "email": "ahmed@example.com",
      "avatar": "url",
      "bio": "مطور ويب محترف",
      "type": "freelancer",
      "rating": 4.8,
      "completedProjects": 25
    }
  }
}
```

### 2. الحصول على قائمة المستقلين
```
GET /users/freelancers?specialty=web&rating=4.5&page=1&limit=12
```

**Query Parameters:**
- `specialty` - التخصص (web, mobile, design, etc)
- `rating` - الحد الأدنى للتقييم (0-5)
- `page` - رقم الصفحة
- `limit` - عدد النتائج

### 3. الحصول على تقييمات المستخدم
```
GET /users/:id/reviews
```

---

## 💳 Payments Endpoints

### 1. الحصول على سجل الدفعات
```
GET /payments?page=1&limit=10
```
**يتطلب:** Authentication

### 2. إنشاء دفعة جديدة
```
POST /payments
```
**يتطلب:** Authentication

**Request Body:**
```json
{
  "amount": 5000,
  "method": "card",
  "projectId": "project_id_optional"
}
```

### 3. الحصول على بيانات المحفظة
```
GET /payments/wallet
```
**يتطلب:** Authentication

**Response:**
```json
{
  "ok": true,
  "data": {
    "balance": 15000,
    "currency": "SAR",
    "totalEarnings": 50000,
    "completedProjects": 25
  }
}
```

---

## 📊 Dashboard Endpoints

### 1. إحصائيات لوحة التحكم
```
GET /dashboard/stats
```
**يتطلب:** Authentication

**Response:**
```json
{
  "ok": true,
  "data": {
    "activeProjects": 3,
    "pendingProposals": 5,
    "monthlyEarnings": 12500,
    "totalEarnings": 50000,
    "walletBalance": 15000,
    "rating": 4.8
  }
}
```

### 2. الأنشطة الأخيرة
```
GET /dashboard/activity?limit=10
```
**يتطلب:** Authentication

### 3. المشاريع النشطة
```
GET /dashboard/active-projects
```
**يتطلب:** Authentication

---

## 👨‍💼 Admin Endpoints

### 1. إحصائيات الإدارة
```
GET /admin/stats
```
**يتطلب:** Authentication + Admin role

### 2. قائمة المستخدمين
```
GET /admin/users?page=1&limit=20
```
**يتطلب:** Authentication + Admin role

### 3. قائمة المشاريع
```
GET /admin/projects?page=1&limit=20
```
**يتطلب:** Authentication + Admin role

### 4. قائمة الدفعات
```
GET /admin/payments?page=1&limit=20
```
**يتطلب:** Authentication + Admin role

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "ok": false,
  "error": "البيانات المدخلة غير صحيحة"
}
```

### 401 Unauthorized
```json
{
  "ok": false,
  "error": "توكن مفقود أو غير صحيح"
}
```

### 403 Forbidden
```json
{
  "ok": false,
  "error": "ليس لديك صلاحية الوصول"
}
```

### 404 Not Found
```json
{
  "ok": false,
  "error": "المورد غير موجود"
}
```

### 500 Internal Server Error
```json
{
  "ok": false,
  "error": "خطأ في الخادم"
}
```

---

## 🧪 أمثلة استخدام مع cURL

### تسجيل الدخول
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### الحصول على المشاريع
```bash
curl http://localhost:3000/api/projects?category=web
```

### إنشاء مشروع (مع التوكن)
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "تطوير موقع",
    "description": "...",
    "category": "web",
    "budget": 5000,
    "budget_type": "fixed"
  }'
```

---

## 📝 ملاحظات مهمة

1. جميع التواريخ بصيغة ISO 8601: `2024-01-15T10:30:00Z`
2. العملات بالريال السعودي (SAR) افتراضياً
3. الأسعار بالمملكة العربية السعودية
4. يتم حفظ التوقيت بـ UTC
5. معرف المستخدم فريد لكل مستخدم

---

آخر تحديث: 2024
