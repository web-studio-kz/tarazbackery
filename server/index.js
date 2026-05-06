const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser'); // Подключаем для работы с куками

const sequelize = require('./db');
const models = require('./models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
require('./config/passport-setup');
const { generalLimiter } = require('./middleware/rateLimiter');

const PORT = process.env.PORT || 5000;
const app = express();

// 1. Настройка Trust Proxy (Критично для Render и корректного IP в Rate Limiter)
app.set('trust proxy', 1);

// 2. Парсеры
app.use(express.json());
app.use(cookieParser()); // Инициализируем куки ПЕРЕД роутами

// 3. CORS — Настройка для работы с Credentials (Cookies)
const whitelist = [
    process.env.CLIENT_URL, 
    process.env.LOCAL_URL,  
    'http://localhost:5001' 
];

app.use(cors({
    origin: function (origin, callback) {
        // origin === undefined бывает при запросах из Postman или если запрос с того же домена
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("CORS blocked origin:", origin); // Для отладки в логах
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // РАЗРЕШАЕМ передачу кук в обоих направлениях
}));

// 4. Раздача статики
app.use(express.static(path.resolve(__dirname, 'static')));

// 5. Глобальный ограничитель запросов (пингуем его аккуратно при разработке)
app.use('/api', generalLimiter); 

// 6. Инициализация Passport
app.use(passport.initialize());

// 7. Основной роутер
app.use('/api', router);

// 8. Обработчик ошибок — САМЫЙ ПОСЛЕДНИЙ
app.use(errorHandler);

// --- Запуск сервера ---
const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        // В development лучше использовать sync() аккуратно. 
        // Если база на Render, миграции мы уже сделали вручную.
        await sequelize.sync(); 
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
}

start();