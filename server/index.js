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

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser()); 
const whitelist = [
    process.env.CLIENT_URL, 
    process.env.LOCAL_URL,  
    'http://localhost:5001' 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("CORS blocked origin:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', generalLimiter); 
app.use(passport.initialize());
app.use('/api', router);
app.use(errorHandler);
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