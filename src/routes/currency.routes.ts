import express from 'express';
import * as CurrencyService from '../services/currency.service';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const currencies = await CurrencyService.getCurrencies();
        res.status(200).send(currencies);
    } catch (error) {
        res.status(500).send({
            error: 'There was an error retrieving currencies information.',
            message: error
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.code || !req.body.name) {
        res.status(404).send({
            error: 'One or more mandatory fields is missing from the request body.'
        });
    }
    try {
        const currency = await CurrencyService.addCurrency(
            req.body.code,
            req.body.name
        );
        res.status(201).send({
            message: 'A new currency has been added successfully.',
            currency
        });
    } catch (error) {
        res.status(500).send({
            error: 'There was an error adding the currency.'
        });
    }
});

export default router;
