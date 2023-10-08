const express = require("express");
const middleware = require("./users-middleware");
const controller = require("./users-controller");

const Router = express.Router();

Router.post("/sign-up", middleware.validateNewUser, controller.createUser);
Router.post("/login", middleware.validateLogin, controller.loginUser);

module.exports = Router;
