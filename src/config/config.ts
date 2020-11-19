export const AppSettings = {
    port: process.env.PORT || 5000,
}

export const DatabaseSettings = {
    name: process.env.DBNAME || 'monetarytmdb',
    username: process.env.DBUSERNAME || 'commander',
    password: process.env.DBPASSWORD || '3fN3&Q#7nVMW$4zU6WS5',
    host: process.env.DBHOST || 'monetary-transactions-manager.c9kpuiz5p88j.us-east-2.rds.amazonaws.com',
    dialect: process.env.DBDIALECT || 'postgres',
    logging: process.env.DBLOGGING || false
}

export const FixerSettings = {
    baseUrl: process.env.FIXERBASEURL || 'http://data.fixer.io/api/latest',
    accessKey: process.env.FIXERACCESSKEY || 'd65173641e591f2cefb32530a7bf6365'
}
