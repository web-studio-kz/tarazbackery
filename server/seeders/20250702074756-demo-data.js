'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Создаем Категории
    await queryInterface.bulkInsert('Categories', [
      { name: 'Бургеры', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Баскеты', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Напитки', createdAt: new Date(), updatedAt: new Date() },
    ], {});

    // Получаем созданные категории, чтобы использовать их ID
    const categories = await queryInterface.sequelize.query(
      `SELECT id from "Categories";`
    );
    const burgerCategoryId = categories[0][0].id;
    const basketCategoryId = categories[0][1].id;
    const drinkCategoryId = categories[0][2].id;
    

    // Создаем Продукты
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Шефбургер Острый',
        description: 'Оригинальное куриное филе в острой панировке, сочные листья салата, помидоры и соус в пшеничной булочке.',
        price: 1550,
        imageUrl: 'images/products/shef_ost.png', // Пути будем использовать относительные
        categoryId: burgerCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Шефбургер Де Люкс',
        description: 'Оригинальное куриное филе в оригинальной панировке, сочные листья салата, помидоры и соус в пшеничной булочке.',
        price: 1650,
        imageUrl: 'images/products/shef_delux.png',
        categoryId: burgerCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Баскет 16 крыльев',
        description: '16 острых и сочных куриных крылышек в хрустящей панировке Hot&Spicy.',
        price: 4700,
        imageUrl: 'images/products/basket_16.png',
        categoryId: basketCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Чизбургер',
        description: '2 стрипса оригинальных, лук, сыр чеддер, маринованные огурцы, горчичный соус, кетчуп, на пшеничной булочке с кунжутом',
        price: 1700,
        imageUrl: 'images/products/cheeseburger1.png',
        categoryId: burgerCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pepsi',
        description: 'Газированный прохладительный напиток',
        price: 500,
        imageUrl: 'images/products/pepsi.png',
        categoryId: drinkCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Piala Ананас',
        description: 'Прохладительный написток со вкусом ананаса',
        price: 500,
        imageUrl: 'images/products/icetea.png',
        categoryId: drinkCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asu',
        description: 'Миниральная вода без газа',
        price: 500,
        imageUrl: 'images/products/asu.jpg',
        categoryId: drinkCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Френдс бокс 36 острых крылышек',
        description: '36 острых крылышек, баскет картофель фри',
        price: 13000,
        imageUrl: 'images/products/36winds.jpg',
        categoryId: basketCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Команда для отката сидов
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};