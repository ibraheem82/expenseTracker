require('express-async-errors');

const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: '3.0.0',
      servers:[
        {
            url: "https://expensetracker-znrn.onrender.com/"
        }
      ],
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
    },
    apis: [
        './modules/users/users.routes.js',
        './modules/transactions/transactions.routes.js',
    ],
  };

const spacs = swaggerJsdoc(options)

app.use(
    "api/docs",
    swaggerUi.serve,
    swaggerUi.setup(spacs)
)
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// 


// app.all("*", (req, res, next) => {

//     res.status(404).json({
//         status: "failed",
//         message: `404 Not Found: ${req.originalUrl}`
//     })
// });

app.use(errorHandler);



app.listen(8000, () => {
    console.log("Server started ...");
});

