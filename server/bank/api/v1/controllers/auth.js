require('dotenv').config({path: '../../../.env'});
const Account = require('../../../models/account');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');

exports.postSignup = async (req, res, next) => {

    try {
        const account = await Account.query().insert(req.body).returning('*');
        res.status(201).json(account);
    }
    catch (err) {
        console.dir(err);
        next(err);
    }
}

exports.postLogin = async (req, res, next) => {
    let accountNumber = req.body.accountNumber;
    let password = req.body.password;

    try {
        let account = await Account.query().findOne({ accountNumber });
        if (account) {
            if (await argon2.verify(account.password, password)) {
                //delete account.password;
                //return res.status(200).json(account);
                let session = jwt.sign({ 'id': account.id }, process.env.SESSION_SECRET, { expiresIn: '30d' });
                return res.status(200).json({
                    'session': session
                });

            }
        }
        return next(httpErrors(401, "Invalid account number or password"));
    }
    catch (err) {
        next(err);
    }
}

