import express from 'express';
import * as AccountService from '../services/account.service';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await AccountService.getAccounts();
        res.status(200).send(accounts);
    } catch (error) {
        res.status(500).send({
            error: 'There was an error retrieving accounts information.',
            message: error
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.UserId || !req.body.CurrencyId) {
        res.status(404).send({
            error: 'One or more mandatory fields is missing from the request body.'
        });
    }
    try {
        const account = await AccountService.addAccount(
            req.body.capital,
            req.body.UserId,
            req.body.CurrencyId
        );
        res.status(201).send({
            message: 'A new account has been created successfully.',
            account
        });
    } catch (error) {
        res.status(500).send({
            error: 'There was an error creating the account.'
        });
    }
});

export default router;
