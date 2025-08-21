"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      `SELECT id from Students;`
    );

    const studentRows = students[0];

    if (studentRows.length === 0) {
      throw new Error("No students found! Run student seeder first.");
    }
    await queryInterface.bulkInsert(
      "Parents",
      [
        {
          name: "John Doe",
          email: "johndoe@example.com",
          password: "password123",
          phone: "1234567890",
          address: "123 Main St",
          studentId: studentRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          password: "password123",
          phone: "1234567890",
          address: "123 Main St",
          studentId: studentRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doi",
          email: "johndoi@example.com",
          password: "password123",
          phone: "1234567890",
          address: "123 Main St",
          studentId: studentRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Doei",
          email: "janedoei@example.com",
          password: "password123",
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
