require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const sequelize = require('./db');
const models = require('./models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
require('./config/passport-setup');
const { generalLimiter } = require('./middleware/rateLimiter'); // <-- Импортируем наш общий лимитер

const PORT = process.env.PORT || 5000;
const app = express();
app.set('trust proxy', 1);


// 1 CORS
const whitelist = [process.env.CLIENT_URL, process.env.LOCAL_URL];
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// 2 Парсеры
app.use(express.json());

// 3 Раздача статики
app.use(express.static(path.resolve(__dirname, 'static')));

// 4 Общий ограничитель запросов
app.use('/api', generalLimiter); 

// 5. Инициализация Passport
app.use(passport.initialize());

// 6. Основной роутер
app.use('/api', router);

// 7. Обработчик ошибок - САМЫЙ ПОСЛЕДНИЙ
app.use(errorHandler);


// --- Запуск сервера ---
const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync();
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
}

start();