// server/db/index.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Определяем, нужна ли опция SSL
const isProduction = process.env.NODE_ENV === 'production';

const options = {
    dialect: 'postgres',
};

// Включаем SSL только для продакшена
if (isProduction) {
    options.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, options);

module.exports = sequelize;