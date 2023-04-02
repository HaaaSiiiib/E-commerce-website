const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');
const argon2 = require('argon2');

Model.knex(knex);

class Account extends Model {

    static get tableName() {
        return 'account';
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
            required: ['name', 'email', 'phone', 'address', 'type', 'password'],

            properties: {
                //id: { type: 'integer' },
                name: { type: 'string', transform: ['trim'], minLength: 1, maxLength: 255 },
                email: { type: 'string', transform: ['trim', 'toLowerCase'], format: 'email', minLength: 6, maxLength: 127 },
                phone: { type: 'string', transform: ['trim'] },
                address: { type: 'string', transform: ['trim'], minLength: 1, maxLength: 255 },
                type: { type: 'string', enum: ['current', 'savings', 'recurring_deposit', 'fixed_deposit'] },
                //status: { type: 'string', enum: ['active', 'inactive', 'suspended'] },
                //accountNumber: { type: 'string', format: 'uuid' },
                password: {type: 'string', minLength: 8, maxLength: 128}

            }
        };
    }

    async $beforeInsert() {
        try {
            let password = this.password;
            const hashedPassword = await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 16 * 1024,
                timeCost: 2
            });
            this.password = hashedPassword;
        }
        catch (err) {
            next(err);
        }

    }

    $formatJson(json) {
        json = super.$formatJson(json);
        //delete json.id;
        delete json.password;
        //delete json.role;
        //delete json.createdAt;
        //delete json.updatedAt;
        return json;
      }

    static get relationMappings() {
        return {
            transaction: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./transaction'),
                join: {
                    from: 'account.id',
                    through: {
                        from: 'account_transaction.account_id',
                        to: 'account_transaction.transaction_id',
                        extra: ['relation']
                    },
                    to: 'transaction.id'
                }
            }

        };
    }
}

module.exports = Account;
