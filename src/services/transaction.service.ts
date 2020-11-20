import { Op } from 'sequelize';
import db from '../models';
import * as FixerService from '../services/fixer.service';

const Transactions = db.transactions;
const Accounts = db.accounts;

export const getTransactions = async (fromDate: string, toDate: string, sourceAccountId: string) => {
    try {
        const filtersArray = [];
        if (fromDate) {
            filtersArray.push({
                date: {
                    [Op.gte]: fromDate
                }
            });
        }
        if (toDate) {
            filtersArray.push({
                date: {
                    [Op.lte]: toDate
                }
            });
        }
        if (sourceAccountId) {
            filtersArray.push({
                originAccountId: sourceAccountId
            });
        }
        const transactions = await Transactions.findAll({
            where: {
                [Op.and]: filtersArray
            }
        });
        return transactions;
    } catch (error) {
        return new Error(error);
    }
}

export const transfer = async (
    amount: number,
    description: string,
    originAccountId: number,
    destinationAccountId: number,
    date: string
) => {
    
    const originAccount = await Accounts.findByPk(originAccountId, { include: 'Currency' });
    const destinationAccount = await Accounts.findByPk(destinationAccountId, { include: 'Currency' });

    if (originAccount.capital < amount) {
        throw new Error('Insufficient funds');
    }

    if (originAccount.UserId !== destinationAccount.UserId) {
        amount *= 1.01;
    }

    try {
        await Accounts.update({ capital: (originAccount.capital - amount) }, {
            where: {
                id: originAccount.id
            }
        });
    } catch (error) {
        throw new Error(error);
    }

    if (originAccount.CurrencyId !== destinationAccount.CurrencyId) {
        try {
            amount =  await FixerService.amountConversion(amount, originAccount.Currency.code, destinationAccount.Currency.code);
        } catch (error) {
            throw new Error(error);
        }
    }

    try {
        await Accounts.update({ capital: (destinationAccount.capital + amount) }, {
            where: {
                id: destinationAccount.id
            }
        });
    } catch (error) {
        throw new Error(error);
    }

    return await Transactions.create({
        amount,
        description,
        originAccountId,
        destinationAccountId,
        date
    });
}
