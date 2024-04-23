const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const nodemailer = require('nodemailer');
const register = async (req, res) => {
    const usersModel = mongoose.model("users");

    const {email, password, confirm_password, name, balance} = req.body;

    // ! Validations 
    //  && email === ""
    if(!email) throw "Email must be provided!";
    if(!password) throw "Password must be provided";
    if(password.length < 5) throw "Password must be at least 5 characters long."
    if(!name) throw "Name is required";
    if(password !== confirm_password) throw "Password and confirmed password must match."

    const getDuplicateEmail = await usersModel.findOne({
        email:email
    });

    if(getDuplicateEmail) throw `${email} already exists!`;

    const hashedPassword = await bcrypt.hash(password, 15) // to make the password very secure.

    // await usersModel.create({
    //     name: name,
    //     email :email,
    //     password: hashedPassword,
    //     balance: balance,
    // });

    const createdUser = await usersModel.create({
            name: name,
            email :email,
            password: hashedPassword,
            balance: balance,
        });

const accessToken = jwtManager(createdUser);


let transporter = nodemailer.createTransport({
    host: process.env.mail_host,
    port: process.env.mail_port,
    auth: {
      user: process.env.mail_email,
      pass: process.env.mail_pass
    }
  });

  const mailOptions = {
    to: createdUser.email,
    from: "astro@buld.com",
    subject: "Welcome to Expense tracker",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Expense Tracker</title>
      </head>
      <body style="font-family: Arial, sans-serif;">
  
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="background-color: #f7f7f7; padding: 20px; text-align: center;">
              <h1 style="color: #333333;">Welcome to Expense By Astro 🌏</h1>
              <b> Hi ${createdUser.name}</b>
              <p style="color: #666666; font-size: 16px;">We hope you can manage your expenses easily from our platform.</p>
            </td>
          </tr>
        </table>
  
      </body>
      </html>
    `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred while sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  

    res.status(201).json({
        status: "User registered successfully!",
        accessToken : accessToken
    });
}

module.exports = register;