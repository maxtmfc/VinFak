const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

const adminRouter = express.Router();

adminRouter
  .route("/")
  .get(async (req, res) => {
    const allUsers = await User.findAll({ include: "Status" });
    console.log(allUsers, '/////////');
    res.json(allUsers);
  })
  .post(async (req, res) => {
    const { firstName, lastName, nickName, email, password } = req.body;
    const hashpass = await bcrypt.hash(password, 10);

    const [foundUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        nickName,
        hashpass,
        oauthId: null,
        birthDate: '1990-10-24 03:00:00.000 +0300',
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
