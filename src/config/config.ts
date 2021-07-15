import dotenv from 'dotenv';

dotenv.config();

export const AppSettings = {
    port: process.env.PORT || 5000,
}

export const DatabaseSettings = {
    name: process.env.DBNAME || '',
    username: process.env.DBUSERNAME || '',
    password: process.env.DBPASSWORD || '',
    host: process.env.DBHOST || '',
    dialect: process.env.DBDIALECT || 'postgres',
    logging: process.env.DBLOGGING || false
}

export const FixerSettings = {
    baseUrl: process.env.FIXERBASEURL || '',
    accessKey: process.env.FIXERACCESSKEY || ''
}
