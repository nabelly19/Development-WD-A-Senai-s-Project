const db = require ("../config/db")
const Sequelize = require("sequelize");

const Company = db.define('Companies', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Name: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    CNPJ: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    CEP: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
})