const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const Transaction = sequelize.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    transactionPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        min: 0
    },
    transactionMessage: {
        type: Sequelize.STRING
    }
})

module.exports = Transaction;

