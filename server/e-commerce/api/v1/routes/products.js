const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, productController.getProducts);

router.get('/:id', isAuth, productController.getProduct);

router.post('/', isAuth, productController.postProduct);

router.delete('/:id', isAuth, productController.deleteProduct);

module.exports = router;