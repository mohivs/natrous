const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log(transporter);
  //2) DEFINETHE EMAIL OPTIONS
  const mailOptions = {
    from: 'mohsen <admin@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  //3) SEND EMAIL
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
