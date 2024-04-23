const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");
const forgotPassword = async (req, res) => {

    const usersModel = mongoose.model("users");

    const {email} = req.body;

    if(!email) throw "Email is required."

    const getUser = await usersModel.findOne({
        email:email
    });

    if (!getUser) throw "This email does not exist in the system!"

    const resetCode = Math.floor(10000 + Math.random() * 90000);
    await usersModel.updateOne({
        email:email
    }, {
        reset_code : resetCode
    },
    {
        runValidators : true,
    }
);






  await emailManager(email,  "Reset Your password.",
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
  </head>
  <body style="font-family: Arial, sans-serif;">

    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="background-color: #f7f7f7; padding: 20px; text-align: center;">
          <h1 style="color: #333333;">Reset Your password 🔑</h1>
          <b> Hi ${getUser.name}</b>
          <p style="color: #666666; font-size: 16px;">Your 5-Digit verification code is ${resetCode}.</p>
        </td>
      </tr>
    </table>

  </body>
  </html>
`
    )


    res.status(200).json({
        status : `Reset Code sent to ${email} successfully.`
    });
};

module.exports = forgotPassword;