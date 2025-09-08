'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
        OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
        OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  OrderItem.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};