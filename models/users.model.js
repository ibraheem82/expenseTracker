const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    full_name:{
        type: String,
        required: [true, "Please provide full name.!"]
    },

    email:{
        type: String,
        required: [true, "Email is required."]
    },

    password:{
        type: String,
        required: [true, "Password is required.!"]
    },

    balance:{
        type: Number,
        required: [true, "Balance is required.!"],
        default:0
    }
})



const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;