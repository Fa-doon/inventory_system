const joi = require("joi");

async function validateNewUser(req, res, next) {
  try {
    const user = req.body;

    const schema = joi.object({
      name: joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string.",
        "string.required": "Name is required",
      }),
      password: joi.string().min(6).required().messages({
        "string.required": "Password is required",
        "string.min": "Password must be at least {6} characters long.",
      }),
      email: joi.string().email().required().messages({
        "string.email": "Please provide a valid email address.",
        "string.required": "Email is required",
      }),
      address: joi.string().required().messages({
        "string.required": "Address is required",
      }),
      phoneNumber: joi.string().required().messages({
        "string.required": "Phone number is required",
      }),
      gender: joi.string().valid("male", "female").required().messages({
        "string.required": "Gender is required",
      }),
    });

    const valid = await schema.validateAsync(user, { abortEarly: true });

    next();
  } catch (error) {
    res.status(422).json({
      message: `Something went wrong`,
      error: error.message,
    });
  }
}

async function validateLogin(req, res, next) {
  try {
    const user = req.body;

    const schema = joi.object({
      email: joi.string().email().required().messages({
        "string.email": "Please provide a valid email address.",
        "string.required": "Email is required",
      }),
      password: joi.string().required().messages({
        "string.required": "Password is required",
      }),
    });

    await schema.validateAsync(user, { abortEarly: false });

    next();
  } catch (error) {
    res.status(422).json({
      message: `Something went wrong`,
      error: error.message,
    });
  }
}

module.exports = {
  validateNewUser,
  validateLogin,
};
