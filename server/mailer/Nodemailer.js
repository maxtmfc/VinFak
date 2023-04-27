const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../db/models/user");

// // async function registerUser(userData) {
// //     const uuid = uuidv4();
// //     const newUser = new User ({
// //     uuid,
// //     email: userData.email,
// //   });
// //   try{
// //       const savedUser = await newUser.save();
// //       console.log("User Saved", savedUser);
// //     } catch (error) {
// //     console.log(error)
// //   }
// //   sendEmail(userData.email, uuid)
// // }

// // function sendEmail(email, uuid) {
// //   const mailOptions = {
// //     from: process.env.EMAIL,
// //     to: req.session.user.email,
// //     subject: "Код подтверждения",
// //     html: `<p>Здесь ваш случайный код: <strong>http://localhost:5173/login/forget/${uuid}</strong></p>`, // Прописать полный путь ссылки, который user должен получать на почте
// //   };

// //   const transporter = nodemailer.createTransport({
// //     host: "smtp.yandex.ru",
// //     port: 465,
// //     secure: true,
// //     auth: {
// //       user: process.env.EMAIL,
// //       pass: process.env.PASSWORD_HASH,
// //     },
// //   });

// //   transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       console.log(error);
// //     } else {
// //       console.log("Email send", info);
// //     }
// //   });
// // }

// // module.exports = registerUser;

// // ----------------------------------------------------------------------------------------------------

// // function sendEmail(email) {
// //   function generateUUID() {
// //     return uuidv4();
// //   }
// //   const mailOptions = {
// //     from: process.env.EMAIL,
// //     to: email,
// //     subject: "Код подтверждения",
// //     html: `<p>Здесь ваш случайный код: <strong>http://localhost:5173/login/forget/${generateUUID()}</strong></p>`, // Прописать полный путь ссылки, который user должен получать на почте
// //   };

// //   const transporter = nodemailer.createTransport({
// //     host: "smtp.gmail.com",
// //     port: 465,
// //     secure: true,
// //     auth: {
// //       user: "serkolganov8@gmail.com",
// //       pass: "Zytgjvy.5871",
// //     },
// //   });

// //   transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       console.log(error);
// //     } else {
// //       console.log("Email send", info);
// //     }
// //   });
// // }

// // module.exports = sendEmail;

// // --------------------------------------------------------------------------------------------------------

// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();
// // const dotenv = require("dotenv");
// // dotenv.config();
// const User = require("../db/models/user")

// const OAuth2_client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
// OAuth2_client.setCredentials({ refresh_token : process.env.GOOGLE_REFRESH_TOKEN})

// async function senduuid(recipient) {
//   const accessToken = OAuth2_client.getAccessToken()

//   const transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: GOOGLE_USER,
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       refreshToken: GOOGLE_REFRESH_TOKEN,
//       accessToken: accessToken,
//     }
//   })

//   let user = await User.findOne({ email: recipient });
//   if(!user) {
//     user = new User({ email: recipient });
//   }

//   let uuid = user.uuid;
//   if(!uuid) {
//     uuid = uuidv4();
//     user.uuid = uuid;
//     await user.save();
//   }

//   const mail_options = {
//     from: GOOGLE_USER,
//     to: recipient,
//     subject: 'Personal link',
//     html: `<p>Здесь ваш случайный код: <strong>http://localhost:5173/login/forget/${uuid}</strong></p>`
//   }

//   transport.sendMail(mail_options, function(error, result) {
//     if(error) {
//       console.log('Error: ', error)
//     }else {
//       console.log('Succes: ', result)
//     }
//     transport.close()
//   })

// }

// module.exports = { senduuid }

function sendEmail(user, uuid) {


  const mailOptions = {
    from: "VinFak01@yandex.ru",
    to: user.email,
    subject: "Код подтверждения",
    html: `<p>Здесь ваш случайный код: <strong>http://localhost:5173/login/forget/${uuid}</strong></p>`, // Прописать полный путь ссылки, который user должен получать на почте
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
