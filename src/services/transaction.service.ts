import db from '../models';
import * as FixerService from '../services/fixer.service';

const Transactions = db.transactions;
const Accounts = db.accounts;

export const getTransactions = async () => {
    return await Transactions.findAll();
}

export const transfer = async (amount: number, description: string, originAccountId: number, destinationAccountId: number) => {
    
    const originAccount = await Accounts.findByPk(originAccountId);
    const destinationAccount = await Accounts.findByPk(destinationAccountId);

    if (originAccount.capital < amount) {
        throw new Error('Insufficient funds');
    }

    if (originAccount.UserId !== destinationAccount.UserId) {
        amount *= 1.01;
    }

    try {
        // await Accounts.update({ capital: (originAccount.capital - amount) }, {
        //     where: {
        //         id: originAccount.id
        //     }
        // });
        await originAccount.update({ capital: (originAccount.capital - amount) });
    } catch (error) {
        throw new Error(error);
    }

    if (originAccount.CurrencyId !== destinationAccount.CurrencyId) {
        amount =  await FixerService.amountConversion(amount, originAccount.Currency.code, destinationAccount.Currency.code);
    }

    await Accounts.update({ capital: (destinationAccount.capital + amount) }, {
        where: {
            id: destinationAccount.id
        }
    });
    
    return await Transactions.create({
        amount,
        description,
        originAccountId,
        destinationAccountId
    });
}
