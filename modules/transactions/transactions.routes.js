const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");

const transactionRoutes = express.Router();

// ** Routes


transactionRoutes.use(auth); // auth middleware is run first before dashboard...

// ** Protected routes

transactionRoutes.post('/addIncome', addIncome);

module.exports = transactionRoutes;