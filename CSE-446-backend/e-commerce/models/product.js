const knex = require('../db/knex');
const { Model, AjvValidator } = require('objection');
const acl = require('./acl');
const authorize = require('objection-authorize')(acl, 'casl');
const addFormats = require('ajv-formats');
const addKeywords = require('ajv-keywords');


Model.knex(knex);

class Product extends authorize(Model) {

    static get tableName() {
        return 'product';
    }

    // static get relationMappings() {

    // }
}

module.exports = Product;