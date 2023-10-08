"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        name: "Cosrx snail mucin",
        price: 10500,
        size: "medium",
        categoryId: 3,
        description: "A great hydrator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tiam",
        price: 9000,
        size: "medium",
        categoryId: 1,
        description: "A great antioxidant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Face and glory",
        price: 7000,
        size: "medium",
        categoryId: 2,
        description: "A great facewash",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
