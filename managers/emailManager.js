const nodemailer = require('nodemailer');

const emailManager = async (to, subject,  html, ) => {
  const transporter = nodemailer.createTransport({
    host: process.env.mail_host,
    port: process.env.mail_port,
    auth: {
      user: process.env.mail_email,
      pass: process.env.mail_pass,
    },
  });


  await transporter.sendMail({
    to,
    from: "astro@buld.com",
    subject,
    html,
  });

};

module.exports = emailManager;
