'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
        validate: {
            isEmail: true,
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
        unique: true,
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