"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      telephone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hashpass: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      admin: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      statusDate: {
        type:Sequelize.DATE,
      },
      uuid: {
        type:Sequelize.STRING,
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Statuses",
          key: "id",
        },
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
    await queryInterface.dropTable("Users");
  },
};
