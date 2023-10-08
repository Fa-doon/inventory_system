const express = require("express");
const { connectToDb } = require("./db");
const userRoute = require("./users/users-route");
const productRoute = require("./product/product-route");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

// connect to MongoDb
connectToDb();

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
