exports.seed = async function(knex) {
  await knex('user').del();
  await knex('user').insert([
    {
      name: 'Mr E-commerce',
      email: 'ecommerce@gmail.com',
      phone: '01234534678',
      address: 'house 51',
      role: 'admin',
      //password 12345678
      password: '$argon2id$v=19$m=65536,t=3,p=1$EtxfiTBZyy3QwOkRTCDfSQ$xlLXmgecg+Msfov0nGVgApFmGSXDvxjvhh1cQPyV5iU'
    },
    {
      name: 'Mr Customer',
      email: 'customer@gmail.com',
      phone: '9875601',
      address: 'house 52',
      role: 'user',
      //password 12345678
      password: '$argon2id$v=19$m=65536,t=3,p=1$EtxfiTBZyy3QwOkRTCDfSQ$xlLXmgecg+Msfov0nGVgApFmGSXDvxjvhh1cQPyV5iU'
    }
  ]);
};
