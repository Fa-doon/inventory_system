const Joi = require("joi");

const validateBody = async (req, res, next) => {
  try {
    const body = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().strict().required(),
      size: Joi.string().required().valid("small", "medium", "large"),
      description: Joi.string().required(),
    });

    await schema.validateAsync(body, { abortEarly: false });

    next();
  } catch (error) {
    res.status(422).json({
      message: `Something went wrong`,
      error: error.message,
    });
  }
};

module.exports = {
  validateBody,
};
