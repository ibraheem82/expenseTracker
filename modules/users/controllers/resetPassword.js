const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");


const resetPassword = async (req, res) => {

    const usersModel = mongoose.model("users");

    const {email, new_password, reset_code} = req.body;

    if(!email) throw "Email is required";
    if(!new_password) throw "Please provide new password!";
    if(!reset_code) throw "Reset code is required.";
    if(new_password.length < 5) throw "Password must be at least 5 characters long."

    // It uses the usersModel to find a user with the provided email and reset_code. This verifies if the email and reset code combination is valid.
// 
    const getUserWithResetCode = await usersModel.findOne({
        email:email,
        reset_code: reset_code,
    })


    if(!getUserWithResetCode) throw "Reset code does not match!";

    const hashedPassword = await bcrypt.hash(new_password, 15)

    // Finally, it uses usersModel.updateOne to update the password for the user with the matching email. It updates the password field with the hashed password obtained earlier.
// The runValidators: true option ensures any validation rules defined on the user model are applied before saving the update.
    await usersModel.updateOne({
        email: email,
    },
    {  
        password: hashedPassword,
        reset_code: ""
    },

    {
        runValidators: true
    }
)

await emailManager(email, "Password reset successfully", "<h1>Password reset successfully, <small>If you have not done that, please contact us! </small>.</h1>")


    res.status(200).json({
        status:"Success",
        message: " Password resetted successfully"
    })
}
module.exports = resetPassword;