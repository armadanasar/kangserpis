const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    orderDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    orderItem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

module.exports = Order;

