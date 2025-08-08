// server/routes/userRouter.js (ОТРЕФАКТОРЕННАЯ ВЕРСИЯ)

const Router = require('express');
const router = new Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../error/ApiError');
const authMiddleware = require('../middleware/authMiddleware');
const { sensitiveActionsLimiter } = require('../middleware/rateLimiter');

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

const generateJwt = (id, email, role, name, phone) => {
    return jwt.sign(
        { id, email, role, name, phone }, 
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

// ОБЩИЙ обработчик для callback'ов от Google и Яндекса
const oAuthCallbackHandler = (req, res) => {
    // В req.user находится либо профиль нового пользователя, либо объект старого
    const profileOrUser = req.user;

    if (profileOrUser.isTemporary) {
        // Сценарий для НОВОГО пользователя
        const tempToken = jwt.sign(profileOrUser, process.env.SECRET_KEY, { expiresIn: '10m' });
        res.redirect(`${process.env.CLIENT_URL}/finish-registration?tempToken=${tempToken}`);
    } else {
        // Сценарий для СУЩЕСТВУЮЩЕГО пользователя
        const token = generateJwt(profileOrUser.id, profileOrUser.email, profileOrUser.role, profileOrUser.name, profileOrUser.phone);
        res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
};


// --- РОУТЫ АУТЕНТИФИКАЦИИ ---

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login/failed' }),
    oAuthCallbackHandler //  Используем общий обработчик
);

// Yandex
router.get('/yandex', passport.authenticate('yandex'));
router.get(
    '/yandex/callback', 
    passport.authenticate('yandex', { session: false, failureRedirect: '/login/failed' }),
    oAuthCallbackHandler //  Используем общий обработчик
);

// Финальная регистрация
router.post('/register/final', sensitiveActionsLimiter, async (req, res, next) => {
    try {
        const { tempToken, phone } = req.body;
        if (!tempToken || !phone) {
            return next(ApiError.badRequest('Не все данные предоставлены'));
        }
        
        let userDataFromToken;
        try {
            userDataFromToken = jwt.verify(tempToken, process.env.SECRET_KEY);
        } catch (e) {
            return next(ApiError.badRequest('Недействительная или просроченная ссылка для регистрации.'));
        }
        
        if (!userDataFromToken.isTemporary) {
            return next(ApiError.badRequest('Неверный тип токена'));
        }
        
        const existingPhone = await User.findOne({ where: { phone } });
        if (existingPhone) {
            return next(ApiError.badRequest('Этот номер телефона уже используется'));
        }
        
        const existingEmail = await User.findOne({ where: { email: userDataFromToken.email } });
        if (existingEmail) {
            return next(ApiError.badRequest('Этот email уже зарегистрирован'));
        }
        
        const user = await User.create({
            email: userDataFromToken.email,
            name: userDataFromToken.name,
            phone: phone,
            role: 'USER'
        });

        const token = generateJwt(user.id, user.email, user.role, user.name, user.phone);
        res.json({ token });

    } catch (e) {
        next(e);
    }
});

// Проверка токена
router.get('/auth/check', authMiddleware, (req, res, next) => {
    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.phone);
    return res.json({ token });
});

// Обработка ошибок
router.get("/login/failed", (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
});

module.exports = router;