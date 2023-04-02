const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');

Model.knex(knex);

class Transaction extends Model {

    static get tableName() {
        return 'transaction';
    }

    static createValidator() {
        return new AjvValidator({
            onCreateAjv: (ajv) => {
                addFormats(ajv);
                addKeywords(ajv);
            },
            options: {
                allErrors: true,
                validateSchema: true,
                ownProperties: true,
            }
        });
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['amount'],

            properties: {
                amount: { type: 'number', transform: ['trim'] },
                description: { type: 'string', transform: ['trim'] }
            }
        };
    }

    static get relationMappings() {
        return {
            account: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./account'),
                join: {
                    from: 'transaction.id',
                    through: {
                        from: 'account_transaction.transaction_id',
                        to: 'account_transaction.account_id',
                        extra: ['relation']
                    },
                    to: 'account.id'
                }
            }

        };
    }
}

module.exports = Transaction;