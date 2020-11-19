import db from '../models';

const Currencies = db.currency;

export const getCurrencies = async () => {
    return await Currencies.findAll();
}

export const addCurrency = async (code: string, name: string) => {
    return await Currencies.create({
        code,
        name
    });
}
