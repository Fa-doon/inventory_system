const ProductModel = require("../models/product");

// get all items

const getAllProducts = (req, res) => {
  ProductModel.find({})
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Something went wrong`,
        error: err,
      });
    });
};

// create an item
const creatProduct = (req, res) => {
  const product = req.body;
  ProductModel.create(product)
    .then((product) => {
      res.status(201).json({
        message: `Product successfully created`,
        data: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Something went wrong`,
        error: err,
      });
    });
};

module.exports = {
  getAllProducts,
  creatProduct,
};
