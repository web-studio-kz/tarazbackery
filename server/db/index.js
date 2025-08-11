const { Sequelize } = require('sequelize');
require('dotenv').config();

const options = {
    dialect: 'postgres',
};

if (process.env.NODE_ENV === 'production') {
    options.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, options);

module.exports = sequelize;