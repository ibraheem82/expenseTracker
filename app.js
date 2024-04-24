require('express-async-errors');

const express = require("express");
const cors = require("cors")
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require('./modules/users/users.routes');
const transactionRoutes = require('./modules/transactions/transactions.routes');

require("dotenv").config();

const app = express();
app.use(cors()); // for deployment.

mongoose.connect(process.env.mongo_connection, {}).then(() => {
    console.log("Mongo connection successful!");
}).catch(() => {
    console.log("Mongo connection failed");
});

require("./models/users.model");
require("./models/transactions.model");
app.use(express.json());

// ** Routes...
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// 

app.all("*", (req, res, next) => {

    res.status(404).json({
        status: "failed",
        message: `404 Not Found: ${req.originalUrl}`
    })
});

app.use(errorHandler);



app.listen(8000, () => {
    console.log("Server started ...");
});

