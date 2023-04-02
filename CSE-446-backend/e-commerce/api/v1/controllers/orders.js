require('dotenv').config({ path: '../../../.env' });
const User = require('../../../models/user');
const Order = require('../../../models/order');
const { Model } = require('objection');
const axios = require('axios');
const httpErrors = require('http-errors');

exports.postOrder = async (req, res, next) => {
    try {
        await Model.transaction(async trx => {
            const cart = await req.user.$relatedQuery('cart', trx).withGraphFetched('items');

            if (cart.items === undefined || cart.items.length == 0) {
                //return res.status(404).send("Add a product to your cart first");
                return next(httpErrors(404, "Add a product to your cart first"));
            }

            //pay to e-commerce

            let payload = {
                amount: Number(cart.price),
                accountNumber: process.env.ECOMMERCE_ACCOUNT,
                description: 'payment from customer to e-commerce account'
            }

            let header = {
                headers: {
                    Authorization: `Bearer ${req.user.bankToken}`
                }
            }

            let response = await axios.post(process.env.TRANSAC_URL, payload, header);

            if (response.data[0].verificationId == undefined || response.data[0].verificationId == null) {
                console.log(response.response.data);
                return next(httpErrors(400, response.response.data));
            }


            //pay to supplier

            payload.accountNumber = process.env.SUPPLIER_ACCOUNT;
            payload.description = 'payment from e-commerce to supplier account';

            const ecommerceAdmin = await User.query().findById(1);
            console.log(ecommerceAdmin);


            header.headers.Authorization = `Bearer ${ecommerceAdmin.bankToken}`;


            let response2 = await axios.post(process.env.TRANSAC_URL, payload, header);

            if (response2.data[0].verificationId == undefined || response2.data[0].verificationId == null) {
                console.log(response2.response.data);
                return next(httpErrors(400, response2.response.data));
            }



            const order = await req.user.$relatedQuery('orders', trx).insert({
                transactionId: response.data[0].verificationId,
                transactionAmount: cart.price,
                shippingAddress: req.body.shippingAddress
            })

            for (let item of cart.items) {
                await order.$relatedQuery('items', trx).insert({
                    productId: item.productId,
                    amount: item.amount,
                    price: item.price
                })
            }

            let response3 = await axios.post(process.env.SUPPLY_URL, payload, header);

            if (response3.data[0].verificationId == undefined || response3.data[0].verificationId == null) {
                console.log(response3.response.data);
                return next(httpErrors(400, response3.response.data));
            }
Q

            await cart.$query(trx).patch({ price: 0});
            await cart.$relatedQuery('items', trx).authorize(req.user).delete();

            res.status(200).json(await order.$query(trx).withGraphFetched('items'));
        })
    }
    catch (err) {
        //console.log(err);
        if (err.response === undefined) {
            next(err);
        }
        else next(err.response.data);
    }
}


exports.getOrder = async (req, res, next) => {
    try {
        let order = await Order.query().findById(req.params.id);
        let orderItems = await order.$query().authorize(req.user).withGraphFetched('items');
        res.status(200).json(orderItems);
    }
    catch (err) {
        next(err);
    }
}


exports.getOrders = async (req, res, next) => {
    try {
        let orders = await req.user.$relatedQuery('orders').withGraphFetched('items');
        res.status(200).json(orders);
    }
    catch (err) {
        next(err);
    }
}