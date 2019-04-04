const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const OrderComment = sequelize.define('orderComment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = OrderItem;