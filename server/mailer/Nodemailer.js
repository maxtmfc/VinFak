const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

function sendEmail() {
  function generateUUID() {
    return uuidv4();
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.session.user.email,
    subject: "Код подтверждения",
    html: `<p>Здесь ваш случайный код: <strong>http://localhost:5173/login/forget/${generateUUID()}</strong></p>`, // Прописать полный путь ссылки, который user должен получать на почте
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_HASH,
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

// использовать последний вариант, посмотреть в документацию, возможно что то изменить (ссылку сохранил) + помнить про функцию, которая генерирует ссылку uuid + установить npm i uuid из документации
