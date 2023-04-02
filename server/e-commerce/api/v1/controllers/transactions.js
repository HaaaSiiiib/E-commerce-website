const Transaction = require('../../../models/transaction');
const Account = require('../../../models/account');
const { Model } = require('objection');
const { raw } = require('../../../models/account');

exports.postTransaction = async (req, res, next) => {
    const sender = req.account;
    const receiver = await Account.query().findOne('account_number', req.body.accountNumber);
    const amount = req.body.amount;
    const description = req.body.description;

    try {
        if (sender.balance < amount) {
            return res.status(401).send("Insufficient balance");
        }
        let transactionInfo;
        const returnValue = await Model.transaction(async trx => {
            transactionInfo = await Transaction.query(trx).insertGraph(
                [
                    {
                        'amount': amount,
                        'description': description,
                        'account': [
                            {
                                'id': sender.id,
                                'relation': 'sender'
                            },
                            {
                                'id': receiver.id,
                                'relation': 'receiver'
                            }
                        ]

                    }

                ],
                {
                    relate: ['account']
                }
            );

            await sender.$query(trx).patch({ 'balance': raw('balance - ?', [amount]) });
            await receiver.$query(trx).patch({ 'balance': raw('balance + ?', [amount]) });
        });

        return res.status(201).json(transactionInfo);
    }
    catch (err) {
        next(err);
    }

}