'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:  {
        type: Sequelize.STRING,
        allowNull: false,  //не может быть пустым
        unique: true       //должен быть уникальным
      },
      password: {
          type: Sequelize.STRING,
          allowNull: true
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USER'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};