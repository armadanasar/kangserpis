const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
})

module.exports = OrderItem;