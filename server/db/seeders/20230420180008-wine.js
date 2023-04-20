/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Wines",
      [
        {
          title: "Фанагория Блан де Блан Брют",
          price: 410,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Эндемы Рислинг Брют",
          price: 410,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Кава",
          price: 510,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Креман",
          price: 570,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Терри Бранко Лисбоа",
          price: 410,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Рислинг Де Жа Вю",
          price: 500,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Грюнер Пфаффль",
          price: 510,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Гевюрц Циммерман",
          price: 510,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Винье Верде Розе",
          price: 470,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Ркацители квеври",
          price: 560,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Терри Тинто Лисбоа",
          price: 410,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Зинфандель бэквудс",
          price: 570,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Пино Нуар Зе Лайнс",
          price: 510,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Маркита Красностоп",
          price: 570,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Сухой Херес",
          price: 470,
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Сладкий херес",
          price: 510,
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Wines", null, {});
  },
};
