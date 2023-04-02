require('dotenv').config({ path: '../../../.env' });
const User = require('../../../models/user');
const axios = require('axios');
const httpErrors = require('http-errors');

exports.getUser = async (req, res, next) => {
    try {
        let user = await User.query().findById(req.params.id);
        let userInfo = await user.$query().authorize(req.user).withGraphFetched('[cart.[items], orders]');
        res.status(200).json(userInfo);
    }
    catch (err) {
        next(err);
        //console.dir(err);
    }
}


exports.putUser = async (req, res, next) => {
    try {

        const user = await User.query().findById(req.params.id);
        const userPatched = await user.$query().authorize(req.user).patch(req.body).returning('*');
        res.status(200).json(userPatched);
    }
    catch (err) {
        next(err);
    }
}

exports.postBankAuth = async (req, res, next) => {
    try {

        if (req.body.accountNumber && req.body.accountPassword) {

            let payload = {
                accountNumber: req.body.accountNumber,
                password: req.body.accountPassword
            };

            let response = await axios.post(process.env.BANK_URL, payload);

            console.log(response);

            if (response.data.session == undefined || response.data.session == null) {
                console.log(response.response.data);
                return next(httpErrors(400, response.response.data));
            }

            await req.user.$query().authorize(req.user).patch({ bankToken: response.data.session });
            return res.status(response.status).send(response.data);
        }

        else {
            next(httpErrors(400, "Provide your bank login information"));
        }

    }
    catch (err) {
        //console.log(err);
        next(err);
    }
}
