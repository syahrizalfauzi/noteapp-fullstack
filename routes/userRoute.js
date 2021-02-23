const express = require("express");
const userController = require("../controllers/userController.js");

const app = express.Router();

app.post("/register", userController.register);
app.post("/login", userController.login);

module.exports = app;
