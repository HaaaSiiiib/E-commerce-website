const knex = require('../db/knex');
const { Model } = require('objection');

Model.knex(knex);

class AccountTransaction extends Model {

    static get tableName() {
        return 'account_transaction';
    }

}

module.exports = AccountTransaction;