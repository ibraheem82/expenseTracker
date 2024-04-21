const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");


const login = async (req, res) => {


const usersModel = mongoose.model("users");


const {email, password} = req.body;

const getUser = await usersModel.findOne({
    email:email
})
    if(!getUser) throw "This email does'nt exist in the system!";

    const comparePassword = await bcrypt.compare(password, getUser.password) // trying to compare the password to the hashed password.

    if(!comparePassword) throw "Email and password do not match.";

    const accessToken = jwtManager(getUser);

    

    res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        accessToken: accessToken // the accessToken contains the informations of the user.
    });
}

module.exports = login;