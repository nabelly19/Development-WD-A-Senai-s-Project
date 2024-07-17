const sequelize = require('sequelize');

const database = new sequelize('WarDec', 'WarDec', 'WarDec123456',
{
    dialect: 'mssql', host: 'localhost', port: 1433 // 60915 // 
});

database.sync();

module.exports = database;