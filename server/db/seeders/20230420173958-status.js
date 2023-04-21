/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Statuses",
      [
        {
          title: "Абитуриент",
          discount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Студент",
          discount: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Бакалавр",
          discount: 26,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Statuses", null, {});
  },
};
