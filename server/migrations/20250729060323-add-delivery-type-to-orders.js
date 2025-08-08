'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'deliveryType', {
      type: Sequelize.STRING, // 'DELIVERY' или 'PICKUP'
      allowNull: false,
      defaultValue: 'DELIVERY'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'deliveryType');
  }
};
