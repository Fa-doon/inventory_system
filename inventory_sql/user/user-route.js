const express = require("express");
const controller = require("./user-controller");
const middleware = require("./user-middleware");

const Router = express.Router();

Router.post("/sign-up", middleware.validateNewUser, controller.createUser);
Router.post("/login", middleware.validateExistingUser, controller.loginUser);

module.exports = Router;
