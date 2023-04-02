const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const isAuth = require('../middlewares/is-auth');


router.get('/:id', isAuth, userController.getUser);

router.put('/:id', isAuth, userController.putUser);

router.post('/:id/bank', isAuth, userController.postBankAuth);

module.exports = router;