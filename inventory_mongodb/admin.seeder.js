const mongoose = require("mongoose");
const AdminModel = require("./models/admin");
require("dotenv").config();

const MONGO_URL = process.env.CONNECTION_URL;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Mongo connection successful`);
  })
  .catch((err) => {
    console.log(err);
  });

const seedAdmin = [
  {
    name: "Fash Tee",
    email: "fash@example.com",
    userId: "6516e1ce48f80070b19bef00",
  },
];

const seedDB = async () => {
  await AdminModel.deleteMany({});
  await AdminModel.insertMany(seedAdmin);
};

seedDB().then(() => {
  mongoose.connection.close();
});
