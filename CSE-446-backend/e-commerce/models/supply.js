const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const acl = require('./acl');
const authorize = require('objection-authorize')(acl, 'casl');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');


Model.knex(knex);

class Supply extends authorize(Model) {

    static get tableName() {
        return 'supply';
    }

    // static get relationMappings() {
    //
    // }
}

module.exports = Supply;