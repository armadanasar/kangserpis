const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const OrderStatus = sequelize.define('orderStatus', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    statusMessage: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = OrderStatus;