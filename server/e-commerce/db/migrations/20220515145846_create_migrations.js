exports.up = function (knex) {
    return knex.schema
        .createTable('user', table => {
            table.increments('id').primary();
            table.text('name').notNullable();
            table.text('email').unique().notNullable();
            table.text('phone').unique().notNullable();
            table.text('address').notNullable();
            table.enu('role', ['admin', 'user']).defaultTo('user');
            table.text('password').notNullable();
            table.text('bankToken');
            table.timestamps(true, true);
        })
        .createTable('product', table => {
            table.increments('id');
            table.text('name').notNullable();
            table.text('imgUrl');
            table.decimal('price', 18, 4).notNullable();
            table.timestamps(true, true);
        })
        .createTable('cart', table => {
            table.increments('id');
            table.integer('userId').references('id').inTable('user').notNullable();
            table.decimal('price', 18, 4).defaultTo(0);
            table.timestamps(true, true);
        })
        .createTable('cartItem', table => {
            table.increments('id');
            table.integer('cartId').references('id').inTable('cart').notNullable();
            table.integer('productId').references('id').inTable('product').notNullable();
            table.integer('amount');
            table.decimal('price', 18, 4).defaultTo(0);
            table.unique(['cartId', 'productId']);
            table.timestamps(true, true);
        })
        .createTable('order', table => {
            table.increments('id');
            table.text('transactionId').notNullable();
            table.decimal('transactionAmount', 18, 4).notNullable();
            table.text('shippingAddress').notNullable();
            table.integer('userId').references('id').inTable('user').onDelete('SET NULL').notNullable();
            table.timestamps(true, true);
        })
        .createTable('orderItem', table => {
            table.increments('id');
            table.integer('orderId').references('id').inTable('order').notNullable();
            table.integer('productId').references('id').inTable('product').notNullable();
            table.integer('amount').notNullable();
            table.decimal('price', 18, 4).defaultTo(0);
            table.unique(['orderId', 'productId']);
            table.timestamps(true, true)
        })
        .createTable('supply', table => {
            table.increments('id');
            table.text('transactionId').notNullable();
            table.decimal('transactionAmount', 18, 4).notNullable();
            table.integer('orderId').references('id').inTable('order');
            table.timestamps(true, true);
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('supply')
        .dropTableIfExists('orderItem')
        .dropTableIfExists('order')
        .dropTableIfExists('cartItem')
        .dropTableIfExists('cart')
        .dropTableIfExists('product')
        .dropTableIfExists('user')
};
