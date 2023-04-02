const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');
const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, orderController.getOrders);

router.get('/:id', isAuth, orderController.getOrder);

router.post('/', isAuth, orderController.postOrder);

module.exports = router;