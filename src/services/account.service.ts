import db from '../models';

const Accounts = db.accounts;

export const getAccounts = async () => {
    try {
        const accounts = await Accounts.findAll({ include: ['User','Currency'] });
        return accounts;
    } catch (error) {
        throw new Error(error);
    } 
}

export const addAccount = async (capital: number, UserId: number, CurrencyId: number) => {
    return await Accounts.create({
        capital,
        UserId,
        CurrencyId
    });
}
