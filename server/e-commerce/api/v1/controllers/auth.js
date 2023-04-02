const User = require('../../../models/user');
const Cart = require('../../../models/cart');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

exports.postSignup = async (req, res, next) => {

    try {
        const user = await User.query().insert(req.body);
        await Cart.query().insert({ userId: user.id });
        res.status(201).json(user);
    }
    catch (err) {
        next(err);
    }
}

exports.postLogin = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        let user = await User.query().findOne({ email });
        if (user) {
            if (await argon2.verify(user.password, password)) {
                //delete account.password;
                //return res.status(200).json(account);
                let session = jwt.sign({ 'id': user.id }, 'mysecretkey', { expiresIn: '30d' });
                res.status(200).json({
                    'id': user.id,
                    'session': session
                });

            }
        }
        return res.status(401).json({ "error": "Invalid account number or password" });
    }
    catch (err) {
        next(err);
    }
}

