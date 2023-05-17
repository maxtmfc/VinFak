/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Никита",
          lastName: "Фомкин",
          nickName: "funkytime",
          email: "fomkin@yandex.ru",
          oauthId: null,
          hashpass: '$2a$10$ZkXVi3One7UjTUxodFVNdeqCxwh1fxHZ/mvCaoWPCXdPf9307ue4S',
          birthDate: new Date("1990-10-24T00:00:00.000Z"),
          image: null,
          admin: true,
          statusId: 1,
          uuid: null,
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
