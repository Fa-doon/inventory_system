const express = require("express");
require("dotenv").config();
const sequelize = require("./config/sequelize");
const userRoute = require("./user/user-route");
const productRoute = require("./product/product-route");

const PORT = process.env.PORT;
const app = express();

// app.use(express.urlencoded());
app.use(express.json());

app.use("/users", userRoute);
app.use("/products", productRoute);

app.get("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: `Route not found`,
  });
});

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    data: null,
    error: "Server Error",
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection to db successful`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
