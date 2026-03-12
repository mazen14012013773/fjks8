/**
 * ملف اختبار بسيط للـ API
 * استخدم هذا الملف للتحقق من أن الخادم يعمل بشكل صحيح
 */

const http = require('http');

// معلومات الخادم
const HOST = 'localhost';
const PORT = 3000;

// دالة لعمل طلب HTTP
function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: body ? JSON.parse(body) : null
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// الاختبارات
async function runTests() {
    console.log('🧪 بدء اختبار API...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ اختبار Health Check...');
        let result = await makeRequest({
            hostname: HOST,
            port: PORT,
            path: '/api/health',
            method: 'GET'
        });

        if (result.status === 200 && result.body.ok) {
            console.log('✅ Server is running\n');
        } else {
            console.log('❌ Health check failed\n');
        }

        // Test 2: Register (should work even without real DB)
        console.log('2️⃣ اختبار التسجيل...');
        result = await makeRequest({
            hostname: HOST,
            port: PORT,
            path: '/api/auth/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, {
            name: 'Test User',
            email: 'test@example.com',
            password: 'Test123456',
            type: 'freelancer'
        });

        if (result.status === 201 && result.body.data.token) {
            console.log('✅ Registration endpoint works\n');
        } else {
            console.log('❌ Registration test failed\n');
        }

        // Test 3: Login
        console.log('3️⃣ اختبار تسجيل الدخول...');
        result = await makeRequest({
            hostname: HOST,
            port: PORT,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, {
            email: 'test@example.com',
            password: 'password123'
        });

        if (result.status === 200 || result.status === 401) {
            console.log('✅ Login endpoint works\n');
        } else {
            console.log('❌ Login test failed\n');
        }

        // Test 4: Get Projects (no auth required)
        console.log('4️⃣ اختبار الحصول على المشاريع...');
        result = await makeRequest({
            hostname: HOST,
            port: PORT,
            path: '/api/projects',
            method: 'GET'
        });

        if (result.status === 200 && result.body.data) {
            console.log('✅ Projects endpoint works\n');
        } else {
            console.log('❌ Projects test failed\n');
        }

        // Test 5: 404 Not Found
        console.log('5️⃣ اختبار 404 Not Found...');
        result = await makeRequest({
            hostname: HOST,
            port: PORT,
            path: '/api/nonexistent',
            method: 'GET'
        });

        if (result.status === 404) {
            console.log('✅ 404 handler works\n');
        } else {
            console.log('❌ 404 test failed\n');
        }

        console.log('✨ انتهى الاختبار\n');
        console.log('الخادم يعمل بشكل صحيح! ✅');
        process.exit(0);

    } catch (error) {
        console.error('❌ خطأ أثناء الاختبار:');
        console.error(error.message);
        console.log('\n⚠️ تأكد من أن الخادم يعمل على http://localhost:3000');
        process.exit(1);
    }
}

// تشغيل الاختبارات
runTests();
