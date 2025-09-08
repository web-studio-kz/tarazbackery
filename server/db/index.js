const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const options = {
    dialect: 'postgres',
};

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