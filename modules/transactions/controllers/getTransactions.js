const mongoose = require("mongoose");
const getTransactions = async (req, res) => {

    const transactionsModel  = mongoose.model("transactions");
    // console.log(req.query);
    // Get all the transactions of the logged in user.
    const transactions = await transactionsModel.find({
        user_id: req.user._id,
        ...req.query, // ...req.query: The ... is a JavaScript spread operator, which is used here to add additional search criteria from the request query parameters. For example, if your request URL was something like /transactions?type=deposit, then req.query would be { type: 'deposit' }, and the find method would end up looking like this: transactionsModel.find({ user_id: req.user._id, type: 'deposit' }).
    })

    res.status(200).json({
        status: "Success",
        data: transactions
    });
};

module.exports = getTransactions