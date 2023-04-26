const express = require("express");
const { User, Status, Stat, Wine } = require("../db/models");

const accountRouter = express.Router();

accountRouter.get("/", async (req, res) => {
  const userAccount = await User.findOne({
    where: { id: req.session.user.id },
    include: [Status, Stat],
  });
  res.json(userAccount);
});

accountRouter.get("/userstat", async (req, res) => {
  const OneUserStat = await Stat.findAll({
    where: { userId: req.session.user.id },
    order: [['createdAt', 'DESC']],
    include: Wine,
  });
  res.json(OneUserStat);
});

accountRouter.patch("/:id", async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

accountRouter.patch("/changestatus/:id", async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

accountRouter.delete("/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  req.session.destroy();
  res.clearCookie("vinfak_sid");
  res.sendStatus(200);
});

module.exports = accountRouter;
