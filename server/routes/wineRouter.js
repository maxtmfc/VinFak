const express = require("express");
const { Wine, Stat, Category } = require("../db/models");

const wineRouter = express.Router();

wineRouter
  .route("/")
  .get(async (req, res) => {
    const allWine = await Wine.findAll({ include: "Category" });
    const result = allWine.map((wine) => ({
      ...wine.dataValues,
      priceStudent: wine.dataValues.price * 0.4,
      priceBakalavr: wine.dataValues.price * 0.5,
    }));
    res.json(result);
  })
  .post(async (req, res) => {
    const { userId, title, count } = req.body;
    const wineId = await Wine.findOne({ where: { title } });
    const newRecord = await Stat.create({ userId, wineId: wineId.id, count });
    res.json(newRecord);
  })
  .patch(async (req, res) => {
    try {
      const { title, price, categoryId } = req.body;
      const foundWine = await Wine.findOne({
        where: { title },
        include: "Category",
      });
      foundWine.title = title;
      foundWine.price = price;
      foundWine.categoryId = categoryId;
      foundWine.priceStudent = foundWine.price * 0.4;
      foundWine.priceBakalavr = foundWine.price * 0.5;
      await foundWine.save();
      const category = await Category.findByPk(categoryId);
      foundWine.Category = category;
      return res.json(foundWine);
    } catch (error) {
      return res.status(501).json({
        message: `Не удалось найти элемент Wine по причине: ${error}`,
      });
    }
  });

wineRouter.route("/newwine").post(async (req, res) => {
  try {
    const { title, price, categoryId } = req.body;
    const [foundWine, created] = await Wine.findOrCreate({
      where: { title },
      defaults: {
        price,
        categoryId,
      },
      include: "Category",
    });

    if (!created) {
      return res.status(401).json({ message: "Такая позиция уже существует" });
    } else {
      foundWine.title = title;
      foundWine.price = price;
      foundWine.categoryId = categoryId;
      foundWine.priceStudent = foundWine.price * 0.4;
      foundWine.priceBakalavr = foundWine.price * 0.5;
      await foundWine.save();
      const category = await Category.findByPk(categoryId);
      foundWine.Category = category;
      return res.json(foundWine);
    }
  } catch (error) {
    return res.status(501).json({
      message: `Не удалось создать новый элемент Wine по причине: ${error}`,
    });
  }
});

wineRouter.route("/:id").delete(async (req, res) => {
  await Wine.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = wineRouter;
