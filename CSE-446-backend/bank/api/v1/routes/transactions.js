const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions');
const isAuth = require('../middlewares/is-auth');

//router.get('/', accountController.getAccounts);

router.post('/', isAuth, transactionController.postTransaction);

router.get('/:verificationId', isAuth, transactionController.getTransaction);

module.exports = router;