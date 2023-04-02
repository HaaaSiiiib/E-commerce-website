require('dotenv').config({ path: '../.env' });

exports.seed = async function (knex) {
  await knex('account').del();
  await knex('account').insert([
    {
      name: 'Mr E-commerce',
      email: 'ecommerce@gmail.com',
      phone: '9875601',
      address: 'house 52',
      type: 'savings',
      status: 'active',
      balance: 1000,
      accountNumber: process.env.ECOMMERCE_ACCOUNT,
      //password is 12345678
      password: '$argon2id$v=19$m=65536,t=3,p=1$EtxfiTBZyy3QwOkRTCDfSQ$xlLXmgecg+Msfov0nGVgApFmGSXDvxjvhh1cQPyV5iU'
    },
    {
      name: 'Mr Supplier',
      email: 'supplier@gmail.com',
      phone: '012345678',
      address: 'house 51',
      type: 'current',
      status: 'active',
      balance: 1000,
      accountNumber: process.env.SUPPLIER_ACCOUNT,
      //password is 12345678
      password: '$argon2id$v=19$m=65536,t=3,p=1$EtxfiTBZyy3QwOkRTCDfSQ$xlLXmgecg+Msfov0nGVgApFmGSXDvxjvhh1cQPyV5iU'
    },
    {
      name: 'Mr Customer',
      email: 'customer@gmail.com',
      phone: '784520195',
      address: 'house 53',
      type: 'recurring_deposit',
      status: 'active',
      balance: 1000,
      accountNumber: process.env.CUSTOMER_ACCOUNT,
      //password is 12345678
      password: '$argon2id$v=19$m=65536,t=3,p=1$EtxfiTBZyy3QwOkRTCDfSQ$xlLXmgecg+Msfov0nGVgApFmGSXDvxjvhh1cQPyV5iU'
    }
  ]);
};
