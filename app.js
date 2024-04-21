require('express-async-errors');

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require('./modules/users/users.routes');
const transactionRoutes = require('./modules/transactions/transactions.routes');

require("dotenv").config();

const app = express();

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

app.use(errorHandler);



app.listen(8000, () => {
    console.log("Server started ...");
});

