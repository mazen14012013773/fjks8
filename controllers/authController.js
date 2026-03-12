const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../config/auth');

/**
 * تسجيل الدخول
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // التحقق من المدخلات
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                error: 'البريد وكلمة المرور مطلوبة'
            });
        }

        // البحث عن المستخدم
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                ok: false,
                error: 'بيانات المستخدم غير صحيحة'
            });
        }

        // التحقق من كلمة المرور
        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                ok: false,
                error: 'كلمة المرور غير صحيحة'
            });
        }

        // إنشاء التوكن
        const token = generateToken(user._id, user.type);

        res.json({
            ok: true,
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    avatar: user.avatar
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في تسجيل الدخول'
        });
    }
};

/**
 * التسجيل الجديد
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        // التحقق من المدخلات
        if (!name || !email || !password || !type) {
            return res.status(400).json({
                ok: false,
                error: 'جميع الحقول مطلوبة'
            });
        }

        // التحقق من وجود المستخدم
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                error: 'المستخدم موجود بالفعل'
            });
        }

        // تشفير كلمة المرور
        const hashedPassword = await hashPassword(password);

        // إنشاء المستخدم الجديد
        user = new User({
            name,
            email,
            password: hashedPassword,
            type
        });
        await user.save();

        // إنشاء التوكن
        const token = generateToken(user._id, user.type);

        res.status(201).json({
            ok: true,
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في التسجيل'
        });
    }
};

/**
 * تحديث الملف الشخصي
 */
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, bio, title, skills } = req.body;
        const userId = req.user.userId;

        const user = await User.findByIdAndUpdate(
            userId,
            { name, phone, bio, title, skills },
            { new: true, runValidators: true }
        );

        res.json({
            ok: true,
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في تحديث الملف الشخصي'
        });
    }
};

/**
 * تغيير كلمة المرور
 */
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.userId;

        const user = await User.findById(userId).select('+password');

        // التحقق من كلمة المرور الحالية
        const isCorrect = await comparePassword(currentPassword, user.password);
        if (!isCorrect) {
            return res.status(400).json({
                ok: false,
                error: 'كلمة المرور الحالية غير صحيحة'
            });
        }

        // تحديث كلمة المرور
        user.password = await hashPassword(newPassword);
        await user.save();

        res.json({
            ok: true,
            data: { message: 'تم تغيير كلمة المرور بنجاح' }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'خطأ في تغيير كلمة المرور'
        });
    }
};
