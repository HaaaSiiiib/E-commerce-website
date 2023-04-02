const Product = require('../../../models/product');
const httpErrors = require('http-errors');

exports.getProducts = async (req, res, next) => {

  try {
    const products = await Product.query();
    res.status(200).json(products);
  }
  catch (err) {
    next(err);
  }
}

exports.getProduct = async (req, res, next) => {
  try {
    let product = await Product.query().findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    }
    else next(httpErrors(404, "No product found with this ID"));
  }
  catch (err) {
    next(err);
  }
}

exports.postProduct = async (req, res, next) => {
  try {
    const { name, imgUrl, price } = req.body;
    let product = await Product.query().insert({ name, imgUrl, price }).authorize(req.user)
      .fetchResourceContextFromDB().returning('*');

    res.status(201).json(product);

  }
  catch (err) {
    next(err);
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.query().findById(req.params.id);
    if (product) {
      const deleted = await product.$query().authorize(req.user).delete();
      res.status(200).json(deleted);
    }
    else next(httpErrors(404, "No product found with this ID"));
  }
  catch (err) {
    next(err);
  }
}
