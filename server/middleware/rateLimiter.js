const rateLimit = require('express-rate-limit');

// Ограничитель для общих API-запросов
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Слишком много запросов, пожалуйста, попробуйте снова через 15 минут.'
});

// Ограничитель для чувствительных действий
const sensitiveActionsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Слишком много попыток. Пожалуйста, попробуйте снова через 15 минут.'
});

module.exports = { generalLimiter, sensitiveActionsLimiter };