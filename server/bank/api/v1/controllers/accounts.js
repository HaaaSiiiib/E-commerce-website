const Account = require('../../../models/account');
const httpErrors = require('http-errors');

exports.getAccounts = async (req, res, next) => {
    try {
        let accounts = await Account.query();
        res.status(200).json(accounts);
    }
    catch (err) {
        next(err);
    }
}

exports.getAccount = async (req, res, next) => {
    try {
        let accountNumber = req.params.accountNumber;
        if (req.account.accountNumber !== accountNumber) {
            return next(httpErrors(403, "You are not authorized to see this account details"));
        }
        let accounts = await Account.query()
            .where('accountNumber', accountNumber)
            .withGraphFetched('[transaction]');
        res.status(200).json(accounts);
    }
    catch (err) {
        next(err);
    }
}

