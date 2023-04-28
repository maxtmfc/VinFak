const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../db/models/user");

function sendEmail(user, uuid) {


  const mailOptions = {
    from: "VinFak01@yandex.ru",
    to: user.email,
    subject: "Код подтверждения",
    html: `<p>Перейди по этой разовой ссылке для изменения пароля: 
    <br /><strong>http://localhost:5173/login/forget/${uuid}</strong></p>`,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: "VinFak01@yandex.ru",
      pass: "trxkttvltfjgjhzi",
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send", info);
    }
  });
}

module.exports = sendEmail;
