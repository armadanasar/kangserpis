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
}
// ,  {
//     classMethods: {
//         associate: 
//     }
// }
)
// Transaction.associate = function(models) {
//     // OrderStatus.belongsTo(models.Order)
//     // Order.belongsTo(models.User)
//     // Seller.hasMany(Order)
//     // Order.belongsTo(models.Seller)   
//     Transaction.belongsTo(models.User)
//     Transaction.belongsTo(models.Seller)
//     Transaction.belonngsTo(models.Order)

// }

module.exports = Transaction;

