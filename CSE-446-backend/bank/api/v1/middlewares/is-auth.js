require('dotenv').config({path: '../../../.env'});
const Account = require('../../../models/account');
const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token);
        if (token == null) {
            return next(httpErrors(401, "No authorization token found"));
        }
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        //console.log(decoded);
        req.account = await Account.query().findById(decoded.id);
        next();
    }
    catch (err) {
        next(err);
    }

}
