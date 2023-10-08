const joi = require("joi");

async function validateProduct(req, res, next) {
  try {
    const productDetails = req.body;

    const schema = joi.object({
      name: joi.string().required(),
      price: joi.number().strict().required(),
      size: joi.string().valid("small", "medium", "large").required(),
      description: joi.string().required(),
    });

    await schema.validateAsync(productDetails, { abortEarly: false });
    next();
  } catch (error) {
    res.status(422).json({
      message: `Something went wrong`,
      error: error.message,
    });
  }
}

module.exports = { validateProduct };
