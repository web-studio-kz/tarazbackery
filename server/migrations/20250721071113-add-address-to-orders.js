'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'address', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('Orders', 'latitude', {
      type: Sequelize.DECIMAL(9, 6),
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'longitude', {
      type: Sequelize.DECIMAL(9, 6),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'address');
    await queryInterface.removeColumn('Orders', 'latitude');
    await queryInterface.removeColumn('Orders', 'longitude');
  }
};
