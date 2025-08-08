'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const db = {};

// Важно: мы не создаем нового подключения здесь!
// Вместо этого мы будем импортировать уже созданное подключение из db/index.js
// и передавать его при инициализации моделей.
// Этот файл теперь отвечает только за сборку моделей из папки.

// Этот код был оставлен для совместимости с sequelize-cli,
// но в нашем приложении он не используется для подключения.
const sequelize = require('../db'); // <-- Вот ключевое изменение! Мы берем наш экземпляр sequelize

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;