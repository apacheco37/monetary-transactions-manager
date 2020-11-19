import { Sequelize } from 'sequelize';
import { DatabaseSettings } from '../config/config';

const sequelize = new Sequelize(
    DatabaseSettings.name,
    DatabaseSettings.username,
    DatabaseSettings.password,
    {
        host: DatabaseSettings.host,
        dialect: DatabaseSettings.dialect as "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql" | undefined,
        logging: DatabaseSettings.logging as boolean
    }
);

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Declare models
db.accounts = require('./account.model')(sequelize);
db.currency = require('./currency.model')(sequelize);
db.transactions = require('./transaction.model')(sequelize);
db.users = require('./user.model')(sequelize);

// Declare associations
db.accounts.belongsTo(db.users);
db.users.hasMany(db.accounts);

db.transactions.belongsTo(db.accounts, { foreignKey: 'originAccountId' });
db.transactions.belongsTo(db.accounts, { foreignKey: 'destinationAccountId' });
db.accounts.hasMany(db.transactions, { foreignKey: 'originAccountId' });
db.accounts.hasMany(db.transactions, { foreignKey: 'destinationAccountId' });

db.accounts.belongsTo(db.currency);

export default db;
