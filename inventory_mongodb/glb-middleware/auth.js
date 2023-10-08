const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  try {
    const body = req.headers.authorization;

    if (!body) {
      return res.status(401).json({
        message: `You are unauthorized`,
      });
    }
    const token = await req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: `invalid or expired token`,
    });
  }
};

module.exports = { checkAuth };
