const express = require("express");
const { User, Status, Stat } = require("../db/models");

const bestRouter = express.Router();

bestRouter.get("/", async (req, res) => {
  const allUsers = await User.findAll({
    include: [Status, Stat],
  });
  res.json(allUsers);
});

module.exports = bestRouter;
