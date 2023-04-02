const Cart = require('../../../models/cart');
const Product = require('../../../models/product');
const { raw, ref, fn } = require('objection');

exports.getCart = async (req, res, next) => {
    try {
        let cart = await req.user.$relatedQuery('cart');
        let cartItems = await cart.$query().authorize(req.user).withGraphFetched('items');
        res.status(200).json(cartItems);
    }
    catch (err) {
        next(err);
    }
}


exports.postCart = async (req, res, next) => {
    try {
        let cart = await req.user.$relatedQuery('cart');
        let product = await Product.query().findById(req.body.productId);
        if (!product) {
            return res.status(404).send("Invalid product id");
        }
        let price = product.price * req.body.amount;
        //if (price < 0) price = 0;
        console.log(price);
        req.body.price = price;

        await cart.$relatedQuery('items').authorize(req.user).insert(req.body)
            .onConflict(['cartId', 'productId'])
            .merge({
                //amount: fn.max(raw('cart_item.amount + ?', req.body.amount), 0),
                //fn.coalesce(ref('age'), 0), '>', 30)
                amount: raw('case when cart_item.amount + ? < 0 then 0 else cart_item.amount + ? end', [req.body.amount, req.body.amount]),
                //amount: ref('cart_item.amount') + req.body.amount,
                price: raw('case when cart_item.price + ? < 0 then 0 else cart_item.price + ? end', [price, price]),
            });
        await cart.$query().patch({ price: raw('case when cart.price + ? < 0 then 0 else cart.price + ? end', [price, price]) });

        res.status(200).json(await cart.$query().withGraphFetched('items'));
    }
    catch (err) {
        next(err);
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        let cart = await req.user.$relatedQuery('cart');
        await cart.$query().patch({ price: 0});
        await cart.$relatedQuery('items').authorize(req.user).delete();

        res.status(200).json(await cart.$query().withGraphFetched('items'));

    }
    catch (err) {
        next(err)
    }
}