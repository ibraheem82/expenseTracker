const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const jsonwebtoken = require("jsonwebtoken");
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

    res.status(201).json({
        status: "User registered successfully!",
        accessToken : accessToken
    });
}

module.exports = register;