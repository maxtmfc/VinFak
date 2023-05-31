/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Statuses",
      [
        {
          title: "Абитуриент",
          discount: 0,
          glassTarget: 10,
          period: 60,
          message: "Описание условий и цели для Абитуриента",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Студент",
          discount: 14,
          glassTarget: 10,
          period: 90,
          message: "Описание условий и цели для Студента",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Бакалавр",
          discount: 26,
          glassTarget: 10,
          period: 90,
          message: "Описание условий и цели для Бакалавра",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Бакалавр",
          discount: 26,
          glassTarget: 10,
          period: 90,
          message: "Описание условий и цели для Бакалавра",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Статус 4",
          discount: 0,
          glassTarget: 0,
          period: 0,
          message: "Описание условий и цели для Статуса 4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Статус 5",
          discount: 0,
          glassTarget: 0,
          period: 0,
          message: "Описание условий и цели для Статуса 5",
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
