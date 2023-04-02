const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const acl = require('./acl');
const authorize = require('objection-authorize')(acl, 'casl');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');


Model.knex(knex);

class OrderItem extends authorize(Model) {

    static get tableName() {
        return 'orderItem';
    }

    static get relationMappings() {
        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./order'),
                join: {
                    from: 'orderItem.orderId',
                    to: 'order.id'
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

module.exports = OrderItem;