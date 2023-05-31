/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Михаил",
          lastName: "Лопатин",
          email: "lopatin@yandex.ru",
          telephone: "79250200869",
          hashpass: '$2a$10$ZkXVi3One7UjTUxodFVNdeqCxwh1fxHZ/mvCaoWPCXdPf9307ue4S',
          image: null,
          admin: "admin",
          statusDate: null,
          uuid: null,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Никита",
          lastName: "Фомкин",
          email: "fomkin@yandex.ru",
          telephone: "79035429293",
          hashpass: '$2a$10$ZkXVi3One7UjTUxodFVNdeqCxwh1fxHZ/mvCaoWPCXdPf9307ue4S',
          image: null,
          admin: "employee",
          statusDate: null,
          uuid: null,
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Максим",
          lastName: "Маслов",
          email: null,
          telephone: "79266558021",
          hashpass: null,
          image: null,
          admin: "user",
          statusDate: null,
          uuid: null,
          statusId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
