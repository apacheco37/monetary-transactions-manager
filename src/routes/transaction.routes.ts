import express from 'express';
import * as TransactionService from '../services/transaction.service';
import * as FixerService from '../services/fixer.service';

const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await TransactionService.getTransactions(
            req.query.From as string,
            req.query.To as string,
            req.query.SourceAccountID as string
        );
        res.status(200).send({
            count: transactions.length,
            records: transactions
        });
    } catch (error) {
        res.status(500).send({
            error: 'There was an error retrieving transactions information.',
            message: error
        });
    }
});

router.post('/transfer', async (req, res) => {
    if (!req.body.accountFrom || !req.body.accountTo || !req.body.amount) {
        res.status(404).send({
            error: 'One or more mandatory fields is missing from the request body.'
        });
    }
    try {
        const transfer = await TransactionService.transfer(
            req.body.amount,
            req.body.description,
            req.body.accountFrom,
            req.body.accountTo,
            req.body.date
        );
        res.status(201).send({
            message: 'A new transfer has been created successfully.',
            transfer
        });
    } catch (error) {
        res.status(500).send({
            error: 'There was an error creating the transfer.',
            message: error
        });
    }
});

router.get('/fixer', async (req, res) => {
    try {
        let number = await FixerService.amountConversion(100, 'USD', 'UYU');
        res.send(number);
    } catch (error) {
        res.send(error)
    }
});

export default router;
