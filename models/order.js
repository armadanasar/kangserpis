const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const Order = sequelize.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    orderDescription: {
        type: Sequelize.STRING
    },
    estimatedDoneDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    estimatedTotalCost: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

module.exports = Order;

