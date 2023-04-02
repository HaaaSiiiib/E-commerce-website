exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('cart').del();
    await knex('cart').insert([
      {
        userId: 1
      },
      {
        userId: 2
      }
    ]);
  };
