const express = require('express');
const router = express.Router();
const supplyController = require('../controllers/supplies');
//const isAuth = require('../middlewares/is-auth');

router.post('/supplies', supplyController.postSupply);

module.exports = router;