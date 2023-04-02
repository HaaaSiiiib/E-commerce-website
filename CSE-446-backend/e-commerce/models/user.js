const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const acl = require('./acl');

const authorize = require('objection-authorize')(acl, 'casl');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');
const argon2 = require('argon2');

Model.knex(knex);

class User extends authorize(Model) {

    static get tableName() {
        return 'user';
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
            required: ['name', 'email', 'phone', 'address', 'password'],

            properties: {
                name: { type: 'string', transform: ['trim'], minLength: 1, maxLength: 255 },
                email: { type: 'string', transform: ['trim', 'toLowerCase'], format: 'email', minLength: 6, maxLength: 127 },
                phone: { type: 'string', transform: ['trim'] },
                address: { type: 'string', transform: ['trim'], minLength: 1, maxLength: 255 },
                role: { type: 'string', enum: ['admin', 'user'] },
                password: {type: 'string', minLength: 8, maxLength: 128},
                bankToken: {type: 'string', transform: ['trim']}
            }
        };
    }

    async $beforeInsert(queryContext) {
        try {
            await super.$beforeInsert(queryContext);
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
            cart: {
                relation: Model.HasOneRelation,
                modelClass: require('./cart'),
                join: {
                    from: 'user.id',
                    to: 'cart.userId'
                }
            },

            orders: {
                relation: Model.HasManyRelation,
                modelClass: require('./order'),
                join: {
                    from: 'user.id',
                    to: 'order.userId'
                }
            }

        };
    }
}

module.exports = User;
