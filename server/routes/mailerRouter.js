const express = require("express");
const bcrypt = require("bcrypt");
// const senduuid = require("../mailer/Nodemailer")
const sendEmail = require("../mailer/Nodemailer");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../db/models");
// const registerUser = require("../mailer/Nodemailer")

const mailerRouter = express.Router();

// endpoint на email (кому отправлять сгенерированный код)
mailerRouter.post("/", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.sendStatus(404);
  }

  const uuid = uuidv4();

  user.uuid = uuid;
  await user.save();

  sendEmail(user, uuid);
  return res.sendStatus(200);
});
//добавить "проверьте почту"

mailerRouter.post("/:uuid", async (req, res) => {
  const { uuid } = req.params;

  const checkUUID = await User.findOne({ where: { uuid: uuid } });
  console.log(checkUUID);
  if (checkUUID) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// endpoint на ввод у нас на сайте сгенерированных цифр, полученных на почте для подтверждения
mailerRouter.post("/new-pass/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { password } = req.body;
  const founduuid = await User.findOne({ where: { uuid } });
  console.log(founduuid, "founduuid =====");
  if (!founduuid) {
    return res.sendStatus(401);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // await founduuid.update({ password: hashedPassword, uuid: null });
  founduuid.hashpass = hashedPassword;
  founduuid.uuid = null;
  await founduuid.save();
  // await founduuid.reload();
  return res.sendStatus(200);
});

module.exports = mailerRouter;
