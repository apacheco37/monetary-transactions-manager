import express from 'express';
import bodyParser from 'body-parser';
import { AppSettings } from './config/config';
import db from './models';
import transactionRoutes from './routes/transaction.routes';
import currencyRoutes from './routes/currency.routes';
import userRoutes from './routes/user.routes';
import accountRoutes from './routes/account.routes';

const app = express();

app.use(bodyParser.json());

app.use('', transactionRoutes);
app.use('/account', accountRoutes);
app.use('/currency', currencyRoutes);
app.use('/user', userRoutes);

db.sequelize.sync({ alter: true })
    .then(() => {
        app.listen(AppSettings.port, () => {
            console.log(`App listening at http://localhost:${AppSettings.port}`);
        });
    }).catch(() => {
        console.log('Unable to connect to DB');
    });
