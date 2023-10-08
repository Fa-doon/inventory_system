const models = require("../models");

// get all items
const getAllProducts = (req, res) => {
  models.Product.findAll({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

// create a product
const createProduct = async (req, res) => {
  const productInfo = req.body;
  console.log(productInfo);

  await models.Product.create(productInfo)
    .then((result) => {
      res.status(201).json({
        message: `Product successfully created`,
        product: result,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500),
        json({
          message: `Something went wrong`,
        });
    });
};

module.exports = {
  getAllProducts,
  createProduct,
};
