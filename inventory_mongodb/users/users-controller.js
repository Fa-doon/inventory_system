const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createUser(req, res) {
  try {
    const user = req.body;
    // check if email address exists
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      res.status(409).json({
        message: `Email already exists`,
      });
      return;
    } else {
      await userModel.create({
        name: user.name,
        password: user.password,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
      });

      return res.status(201).json({
        message: `Registration successful`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong`,
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const user = req.body;
    // console.log(user);
    const existingUser = await userModel.findOne({ email: user.email });
    // console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({
        message: `User not found. Please sign up`,
      });
      return;
    } else {
      const validPassword = await existingUser.isValidPassword(user.password);

      if (!validPassword) {
        return res.status(422).json({
          message: `Email or password incorrect`,
        });
      }

      const token = await jwt.sign({ email: existingUser.email, userId: existingUser.id }, process.env.SECRET_KEY, {
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
      error: error,
    });
  }
}

module.exports = {
  createUser,
  loginUser,
};
