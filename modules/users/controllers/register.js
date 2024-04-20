const mongoose = require("mongoose");

const register = async (req, res) => {
    const usersModel = mongoose.model("users");

    const {email, password, confirm_password, name, balance} = req.body;

    await usersModel.create({
        name: name,
        email :email,
        password: password,
        balance: balance,
    });

    res.status(200).json({
        status: "User registered success",
    });
}

module.exports = register;