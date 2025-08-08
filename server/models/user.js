'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false, // не может быть пустым
        unique: true, // должно быть уникальным
        validate: {
            isEmail: true, // проверка на формат email
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: DataTypes.STRING,
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // тоже уникальный
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};