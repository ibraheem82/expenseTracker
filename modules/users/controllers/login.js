const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {


const usersModel = mongoose.model("users");


const {email, password} = req.body;

const getUser = await usersModel.findOne({
    email:email
})
    console.log(getUser);

    if(!getUser) throw "This email does'nt exist in the system!";

    const comparePassword = await bcrypt.compare(password, getUser.password) // trying to compare the password to the hashed password.

    if(!comparePassword) throw "Email and password do not match.";

    res.status(200).json({
        status: "success",
        message: "User logged in successfully"
    });
}

module.exports = login;