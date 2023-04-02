const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const acl = require('./acl');
const authorize = require('objection-authorize')(acl, 'casl');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');


Model.knex(knex);

class CartItem extends authorize(Model) {

    static get tableName() {
        return 'cartItem';
    }

    static get relationMappings() {
        return {
            cart: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./cart'),
                join: {
                    from: 'cartItem.cartId',
                    to: 'cart.id'
                }
            },

            products: {
                relation: Model.HasManyRelation,
                modelClass: require('./product'),
                join: {
                    from: 'orderItem.productId',
                    to: 'product.id'
                }
            }

        }
    }
}

module.exports = CartItem;