const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const acl = require('./acl');
const authorize = require('objection-authorize')(acl, 'casl');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');


Model.knex(knex);

class Order extends authorize(Model) {

    static get tableName() {
        return 'order';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./user'),
                join: {
                    from: 'order.userId',
                    to: 'user.id'
                }
            },

            items: {
                relation: Model.HasManyRelation,
                modelClass: require('./order-item'),
                join: {
                    from: 'order.id',
                    to: 'orderItem.orderId'
                }
            },

            supply: {
                relation: Model.HasOneRelation,
                modelClass: require('./supply'),
                join: {
                    from: 'order.id',
                    to: 'supply.orderId'
                }
            }

        }
    }
}

module.exports = Order;