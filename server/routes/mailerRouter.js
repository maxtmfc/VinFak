const express = require("express");
const sendEmail = require("../mailer/Nodemailer");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../db/models");

const mailerRouter = express.Router();

// endpoint на email (кому отправлять сгенерированный код)
mailerRouter.post("/", async (req, res) => {
  const { email } = req.body;
  const foundEmail = await User.findOne({ where: { email } });

  if (!foundEmail) {
    return res.sendStatus(404);
  }
  sendEmail();
  return res.sendStatus(200);
});
//добавить "проверьте почту"

// endpoint на ввод у нас на сайте сгенерированных цифр, полученных на почте для подтверждения
mailerRouter.post("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { newPassword } = req.body;
  const founduuid = await User.findOne({ where: { uuid } });
  if (!founduuid) {
    return res.sendStatus(404);
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await founduuid.update({ password: hashedPassword, uuid: null });
  return res.sendStatus(200);
});

// вероятно должен быть get запрос (уточнить)

module.exports = mailerRouter;
