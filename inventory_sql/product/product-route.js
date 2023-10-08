const express = require("express");
const controller = require("./product-controller");
const middleware = require("./product-middleware");
const gl_middleware = require("../global-middleware/auth");

const Router = express.Router();

Router.use(gl_middleware.checkAuth);

Router.get("/", controller.getAllProducts);
Router.post("/", middleware.validateBody, controller.createProduct);

module.exports = Router;
