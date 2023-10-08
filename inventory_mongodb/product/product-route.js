const express = require("express");
const glbMiddleware = require("../glb-middleware/auth");
const middleware = require("./product-middleware");
const controller = require("./product-controller");

const Router = express();
Router.use(glbMiddleware.checkAuth);

Router.get("/", controller.getAllProducts);
Router.post("/", middleware.validateProduct, controller.creatProduct);

module.exports = Router;
