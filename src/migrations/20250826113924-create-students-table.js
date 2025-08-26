"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      rollNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      class: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING(255),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      Bform: {
        type: Sequelize.STRING,
      },
      DOB: {
        type: Sequelize.DATE,
      },
      phone: {
        type: Sequelize.STRING(15),
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Parents",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Students");
  },
};
