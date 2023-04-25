const express = require("express");
const { Wine, Stat, Category, Status } = require("../db/models");

const wineRouter = express.Router();

wineRouter
  .route("/")
  .get(async (req, res) => {
    const discount = await Status.findAll();
    const allWine = await Wine.findAll({ include: "Category" });
    const result = allWine.map((wine) => ({
      ...wine.dataValues,
      priceStudent: Math.round(
        wine.dataValues.price -
          (wine.dataValues.price * discount[1].dataValues.discount) / 100
      ),
      priceBakalavr: Math.round(
        wine.dataValues.price -
          (wine.dataValues.price * discount[2].dataValues.discount) / 100
      ),
    }));
    res.json(result);
  })
  .post(async (req, res) => {
    const { userId, title, count } = req.body;
    const wineId = await Wine.findOne({ where: { title } });
    const newRecord = await Stat.create({
      userId,
      wineId: wineId.id,
      count,
    });
    res.json(newRecord);
  })
  .patch(async (req, res) => {
    try {
      const discount = await Status.findAll();
      const { id, title, price, categoryId } = req.body;
      const foundWine = await Wine.findOne({
        where: { id },
        include: "Category",
      });
      foundWine.title = title;
      foundWine.price = price;
      foundWine.categoryId = categoryId;
      foundWine.priceStudent = Math.round(
        foundWine.price -
          (foundWine.price * discount[1].dataValues.discount) / 100
      );
      foundWine.priceBakalavr = Math.round(
        foundWine.price -
          (foundWine.price * discount[2].dataValues.discount) / 100
      );
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
    const discount = await Status.findAll();
    const { title, price, categoryId } = req.body;
    const [foundWine, created] = await Wine.findOrCreate({
      where: { title },
      include: { model: Category },
      defaults: {
        price,
        categoryId,
      },
    });

    if (!created) {
      return res.status(401).json({ message: "Такая позиция уже существует" });
    } else {
      foundWine.title = title;
      foundWine.price = price;
      foundWine.categoryId = categoryId;
      foundWine.priceStudent = Math.round(
        foundWine.price -
          (foundWine.price * discount[1].dataValues.discount) / 100
      );
      foundWine.priceBakalavr = Math.round(
        foundWine.price -
          (foundWine.price * discount[2].dataValues.discount) / 100
      );
      await foundWine.save();
      await foundWine.reload();
      const category = await Category.findByPk(categoryId);
      await foundWine.setCategory(category);
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
