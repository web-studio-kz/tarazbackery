'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
        Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
        Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};