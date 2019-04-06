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
}
// , {
//     classMethods: {

// }
)
// OrderStatus.associate = function(models) {
//     OrderStatus.belongsTo(models.Order)
//     // Order.belongsTo(models.User)
//     // Seller.hasMany(Order)
//     // Order.belongsTo(models.Seller)   
// }

module.exports = OrderStatus;