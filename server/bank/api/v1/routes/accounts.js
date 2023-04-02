const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accounts');
const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, accountController.getAccounts);

router.get('/:accountNumber', isAuth, accountController.getAccount);

// router.post('/', accountController.postAccount);

module.exports = router;