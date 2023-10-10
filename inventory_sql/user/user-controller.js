const models = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createUser(req, res) {
  try {
    const userDetails = req.body;

    // checking duplicate email
    const existingUser = await models.User.findOne({ where: { email: userDetails.email } });
    if (existingUser) {
      res.status(409).json({
        message: `Email already exists`,
      });
      return;
    } else {
      models.User.create(userDetails).then((result) => {
        res.status(200).json({
          message: `Registration successful`,
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong`,
    });
  }
}

async function loginUser(req, res) {
  try {
    const userInfo = req.body;

    // check if user exists in the db
    const existingUser = await models.User.findOne({ where: { email: userInfo.email } });

    if (!existingUser) {
      res.status(401).json({
        message: `User not found. Please sign up`,
      });
      return;
    } else {
      const validPassword = await existingUser.validPassword(userInfo.password);

      if (!validPassword) {
        return res.status(422).json({
          message: `Email or password incorrect`,
        });
      }

      const token = jwt.sign({ email: existingUser.email, userId: existingUser.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: `Login successful`,
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong`,
    });
  }
}

module.exports = { createUser, loginUser };
