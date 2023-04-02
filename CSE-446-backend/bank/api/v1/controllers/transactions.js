const Transaction = require('../../../models/transaction');
const Account = require('../../../models/account');
const { Model, raw } = require('objection');
const crypto = require('crypto');
const httpErrors = require('http-errors');

exports.postTransaction = async (req, res, next) => {
    const sender = req.account;
    const receiver = await Account.query().findOne('accountNumber', req.body.accountNumber);
    if (sender.id === receiver.id) {
        return next(httpErrors(400, "You cannot make transaction to your own account"));
    }
    const amount = req.body.amount;
    const description = req.body.description;

    try {
        if (sender.balance < amount) {
            return next(httpErrors(400, "Insufficient balance"));
        }
        let transactionInfo;
        const returnValue = await Model.transaction(async trx => {
            transactionInfo = await Transaction.query(trx).insertGraph(
                [
                    {
                        'amount': amount,
                        'description': description,
                        'verificationId': crypto.randomBytes(5).toString('hex').toUpperCase(),
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

exports.getTransaction = async (req, res, next) => {
    try {
        const verificationId = req.params.verificationId;
        const transactionInfo = await Transaction.query().findOne({ verificationId }).withGraphFetched('account');
        if (transactionInfo === undefined || transactionInfo === null || transactionInfo == "") {
            return next(httpErrors(404, "No transaction found with this verification id"))
        }
        res.status(200).json(transactionInfo);
    }
    catch (err) {
        next(err);
    }
}
