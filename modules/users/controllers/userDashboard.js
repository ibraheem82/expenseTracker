const mongoose = require("mongoose");
const userDashboard = async (req, res) => {
    const usersModel = mongoose.model("users");
    const transactionsModel  = mongoose.model("transactions");
    // console.log(req.user._id)

    const getUser = await usersModel.findOne({
        _id : req.user._id, // getting the user by the request that have been attached to them. still getting the user by thier id, to get thier actual data.
        
    }).select("-password");// what you are excluding.
    // OR 
    // .select("name balance email"); // what we want to display in the dashboard.
    // Get current hour

    const transactions = await transactionsModel.find({
        user_id: req.user._id,
    }).sort("-createdAt").limit(5); // sorting in a desecending other, and also limiting.

    const currentHour = new Date().getHours();

    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }


    res.status(200).json({
        status: "success",
        message: `${greeting}  ${getUser.name} 👋`,
        data: getUser,
        transactions
    });
};

module.exports = userDashboard;