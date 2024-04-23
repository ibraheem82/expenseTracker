const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");
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


    await emailManager(createdUser.email,  "Thanks for regsitering with us",
    

    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Expense Tracker</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        table {
          width: 100%;
          max-width: 600px; /* Optional: Set a maximum width for better responsiveness */
          margin: 20px auto; /* Center the table horizontally */
        }
        h1 {
          color: #333333;
          text-align: center;
        }
        b {
          color: #333333;
        }
        p {
          color: #666666;
          font-size: 16px;
          text-align: center;
          padding: 10px 0; /* Add some padding for better readability */
        }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td style="background-color: #f7f7f7; padding: 20px;">
            <h1>Welcome to Expense By Astro </h1>
            <b>Hi ${createdUser.name}</b>
            <p>We hope you can manage your expenses easily from our platform.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,

   
    
      )


    res.status(201).json({
        status: "User registered successfully!",
        accessToken : accessToken
    });
}

module.exports = register;