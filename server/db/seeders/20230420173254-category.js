/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "ИГРИСТОЕ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "БЕЛОЕ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "РОЗОВОЕ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "ОРАНЖ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "КРАСНОЕ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "СЛАДКОЕ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
