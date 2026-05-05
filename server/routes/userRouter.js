const Router = require('express');
const router = new Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../error/ApiError');
const authMiddleware = require('../middleware/authMiddleware');
const { sensitiveActionsLimiter } = require('../middleware/rateLimiter');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1 * 60 * 60 * 1000,
    path: '/'
};

const sendTokenCookie = (res, token) => {
    res.cookie('token', token, cookieOptions);
};

const generateJwt = (id, email, role, name, phone) => {
    return jwt.sign(
        { id, email, role, name, phone }, 
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
};

const oAuthCallbackHandler = (req, res) => {
    const profileOrUser = req.user;
    if (profileOrUser.isTemporary) {
        const tempToken = jwt.sign(profileOrUser, process.env.SECRET_KEY, { expiresIn: '10m' });
        res.redirect(`${process.env.CLIENT_URL}/finish-registration?tempToken=${tempToken}`);
    } else {
        const token = generateJwt(profileOrUser.id, profileOrUser.email, profileOrUser.role, profileOrUser.name, profileOrUser.phone);
        sendTokenCookie(res, token); // Используем наш хелпер
        res.redirect(`${process.env.CLIENT_URL}/auth/callback`);
    }
};

//продакшн
// const oAuthCallbackHandler = (req, res) => {
//     const profileOrUser = req.user;

//     if (profileOrUser.isTemporary) {
//         const tempToken = jwt.sign(profileOrUser, process.env.SECRET_KEY, { expiresIn: '10m' });
//         // Для временного токена можно оставить передачу через URL, так как это не вход
//         res.redirect(`${process.env.CLIENT_URL}/finish-registration?tempToken=${tempToken}`);
//     } else {
//         const token = generateJwt(profileOrUser.id, profileOrUser.email, profileOrUser.role, profileOrUser.name, profileOrUser.phone);
        
//         // УСТАНАВЛИВАЕМ КУКУ ПЕРЕД РЕДИРЕКТОМ
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'none',
//             maxAge: 24 * 60 * 60 * 1000
//         });

//         // Теперь в URL токен НЕ ПЕРЕДАЕМ (безопасность!)
//         res.redirect(`${process.env.CLIENT_URL}/auth/callback`);
//     }
// };

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login/failed' }),
    oAuthCallbackHandler 
);

// Yandex
router.get('/yandex', passport.authenticate('yandex'));
router.get(
    '/yandex/callback', 
    passport.authenticate('yandex', { session: false, failureRedirect: '/login/failed' }),
    oAuthCallbackHandler
);

// Финализация регистрации
router.post('/register/final', sensitiveActionsLimiter, async (req, res, next) => {
    try {
        const { tempToken, phone } = req.body;
        if (!tempToken || !phone) return next(ApiError.badRequest('Нет данных'));
        
        let userData;
        try {
            userData = jwt.verify(tempToken, process.env.SECRET_KEY);
        } catch (e) { return next(ApiError.badRequest('Срок ссылки истек')); }
        
        const user = await User.create({
            email: userData.email,
            name: userData.name,
            phone: phone,
            role: 'USER'
        });

        const token = generateJwt(user.id, user.email, user.role, user.name, user.phone);
        
        res.cookie('token', token, cookieOptions);
        
        return res.json({ message: "Успешно" }); 
    } catch (e) { next(e); }
});

// Проверка авторизации
router.get('/auth/check', authMiddleware, (req, res) => {
    // Middleware уже проверил куку и положил данные в req.user
    // Просто отдаем их фронтенду
    return res.json(req.user); 
});

// --- НОВЫЙ РОУТ: ВЫХОД (LOGOUT) ---
// router.post('/logout', (req, res) =>  {
//     res.clearCookie('token', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
//     });
//     return res.json({ message: "Вышли" });
// });

router.post('/logout', (req, res) => {
    // При удалении параметры ДОЛЖНЫ совпадать с cookieOptions
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    });
    return res.json({ message: "Вышли" });
});

router.get("/login/failed", (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
});

module.exports = router;