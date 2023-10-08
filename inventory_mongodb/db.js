const mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION_URL = process.env.CONNECTION_URL;

function connectToDb() {
  mongoose.connect(CONNECTION_URL);

  mongoose.connection.on("connected", () => {
    console.log(`Connection to MongoDb successful`);
  });

  mongoose.connection.on("error", (error) => {
    console.log(error);
    console.log(`An error occured`);
  });
}

module.exports = { connectToDb };
