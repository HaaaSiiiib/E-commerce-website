exports.up = function (knex) {
    return knex.schema
        .createTable('account', table => {
            table.increments('id').primary();
            table.text('name').notNullable();
            table.text('email').unique().notNullable();
            table.text('phone').unique().notNullable();
            table.text('address').notNullable();
            table.enu('type', ['current', 'savings', 'recurring_deposit', 'fixed_deposit']).notNullable();
            table.enu('status', ['active', 'inactive', 'suspended']).defaultTo('active');
            table.decimal('balance', 18, 4).defaultTo(0);
            table.uuid('accountNumber').defaultTo(knex.raw('gen_random_uuid()'));
            table.text('password').notNullable();
            table.timestamps(true, true);
        })
        .createTable('transaction', table => {
            table.increments('id');
            table.decimal('amount', 18, 4).notNullable();
            table.text('description');
            table.text('verificationId').unique().notNullable();
            table.timestamps(true, true);
        })
        .createTable('account_transaction', table => {
            table.increments('id');
            table.enu('relation', ['sender', 'receiver']).notNullable();
            table.integer('accountId').references('id').inTable('account').onDelete("SET NULL").notNullable();
            table.integer('transactionId').references('id').inTable('transaction').onDelete('SET NULL').notNullable();
            table.timestamps(true, true);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('accountTransaction')
        .dropTableIfExists('transaction')
        .dropTableIfExists('account')
};
