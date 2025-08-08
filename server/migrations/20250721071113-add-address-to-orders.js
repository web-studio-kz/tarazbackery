'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Эта функция добавляет три новых столбца в таблицу 'Orders'
    await queryInterface.addColumn('Orders', 'address', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('Orders', 'latitude', {
      type: Sequelize.DECIMAL(9, 6), // Тип данных для хранения координат
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'longitude', {
      type: Sequelize.DECIMAL(9, 6),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Эта функция нужна для отката миграции, она удаляет эти же столбцы
    await queryInterface.removeColumn('Orders', 'address');
    await queryInterface.removeColumn('Orders', 'latitude');
    await queryInterface.removeColumn('Orders', 'longitude');
  }
};
