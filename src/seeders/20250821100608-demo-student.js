"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Students",
      [
        {
          name: "John Does",
          email: "johndoes@example.com",
          password: "password1234",
          grade: "A",
          address: "123 Main St",
          age: 20,
          Bform: "1234569",
          DOB: "1999-01-02",
          phone: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Doef",
          email: "janedoef@example.com",
          password: "password1235",
          grade: "B",
          address: "123 Main St",
          age: 21,
          Bform: "1234568",
          DOB: "1999-01-01",
          phone: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doig",
          email: "johndoig@example.com",
          password: "password1236",
          grade: "C",
          address: "123 Main St",
          age: 20,
          Bform: "1234567",
          DOB: "1999-01-03",
          phone: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
