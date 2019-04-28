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
    },
    accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: null
    }
}
// , {
//     classMethods: {
        
//     }
// }
)

// Order.associate= function(models) {
//     Order.belongsTo(models.User)
//     // Seller.hasMany(Order)
//     Order.belongsTo(models.Seller)   
//     Order.hasOne(models.OrderStatus)
// }

module.exports = Order;

