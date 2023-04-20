"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      wineId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Wines",
          key: "id",
        },
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Stats");
  },
};
