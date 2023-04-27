const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { nickName, firstName, lastName, birthDate, email, password } = req.body;
  console.log(req.body)

  const hashpass = await bcrypt.hash(password, 10);

  const [foundUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      nickName,
      firstName,
      lastName,
      birthDate: new Date(),
      hashpass,
      image:null,
      oauthId:null,
      admin:false,
      statusId: 1,
    },
  });

  if (!created) return res.status(401).json({ message: "Почта уже существует в системе" });

  req.session.user = foundUser;

  return res.json(foundUser);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) return res.status(401).json({ message: "Такая почта не существует" });

  if (await bcrypt.compare(password, foundUser.hashpass)) {
    req.session.user = foundUser;
    return res.json(foundUser);
  }
  return res.status(401).json({ message: "Неверный пароль" });
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("vinfak_sid");
  res.sendStatus(200);
});

authRouter.get("/check", async (req, res) => {
  if (req.session?.user?.id) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

module.exports = authRouter;
