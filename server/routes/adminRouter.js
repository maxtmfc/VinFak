const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

const adminRouter = express.Router();

adminRouter
  .route("/")
  .get(async (req, res) => {
    const allUsers = await User.findAll({ include: "Status" });
    res.json(allUsers);
  })
  .post(async (req, res) => {
    const { firstName, lastName, nickName, email, password, birthDate } = req.body;
    const hashpass = await bcrypt.hash(password, 10);

    const [foundUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        nickName,
        hashpass,
        oauthId: null,
        birthDate,
        image: null,
        admin: true,
        statusId: 1,
      },
    });

    if (!created) return res.status(401).json({ message: "Email is in use" });

    req.session.user = foundUser;

    return res.json(foundUser);
  });

module.exports = adminRouter;
