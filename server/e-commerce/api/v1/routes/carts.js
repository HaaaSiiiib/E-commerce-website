const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts');
const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, cartController.getCart);

router.post('/', isAuth, cartController.postCart);

router.delete('/', isAuth, cartController.deleteCart);

module.exports = router;