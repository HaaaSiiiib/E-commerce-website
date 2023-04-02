const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const acl = require('./acl');
const authorize = require('objection-authorize')(acl, 'casl');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');


Model.knex(knex);

class Cart extends authorize(Model) {

    static get tableName() {
        return 'cart';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./user'),
                join: {
                    from: 'cart.userId',
                    to: 'user.id'
                }
            },

            items: {
                relation: Model.HasManyRelation,
                modelClass: require('./cart-item'),
                join: {
                    from: 'cart.id',
                    to: 'cartItem.cartId'
                }
            }

        }
    }
}

module.exports = Cart;