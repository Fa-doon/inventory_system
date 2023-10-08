const mongoose = require("mongoose");
const ProductModel = require("./models/product");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Mongo connection successful`);
  })
  .catch((err) => {
    console.log(err);
  });

const seedProducts = [
  {
    name: "Cosrx snail mucin",
    price: 10500,
    size: "medium",
    description: "A great essence hydrator",
  },
  {
    name: "Face & Glory",
    price: 7500,
    size: "medium",
    description: "A great facewash",
  },
  {
    name: "Simple",
    price: 4000,
    size: "small",
    description: "A simple moisturizer",
  },
  {
    name: "Biore",
    price: 5000,
    size: "medium",
    description: "An exfoliating facewash",
  },
  {
    name: "The ordinary BHA AHA",
    price: 7500,
    size: "medium",
    description: "A great exfoliant",
  },
  {
    name: "Havilla",
    price: 7500,
    size: "medium",
    description: "A great night oil",
  },
];

const seedIntoDB = async () => {
  await ProductModel.deleteMany({});
  await ProductModel.insertMany(seedProducts);
};

seedIntoDB().then(() => {
  mongoose.connection.close();
});
