const express = require("express");
const { Wine, Stat } = require("../db/models");

const wineRouter = express.Router();

wineRouter.get("/", async (req, res) => {
  const allWine = await Wine.findAll({ include: "Category" });
  res.json(allWine);
});

wineRouter.post("/", async (req, res) => {
  const { userId, title, count } = req.body;
  const wineId = await Wine.findOne({ where: { title } });
  const newRecord = await Stat.create({ userId, wineId: wineId.id, count });
  res.json(newRecord);
});

module.exports = wineRouter;
