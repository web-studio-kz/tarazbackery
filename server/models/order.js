'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
        Order.belongsTo(models.User, { foreignKey: 'userId' });
        Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
    }
  }
  Order.init({
    

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING'
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    },
    deliveryType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'DELIVERY'
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};