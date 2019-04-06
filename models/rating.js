const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const Rating = sequelize.define('rating', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ratingScore: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        min: 0,
        max: 5
    }
}
// , {
//     classMethods: {
        
//     }
// }
)

// Rating.associate = function(models) {
//     // OrderStatus.belongsTo(models.Order)
//     // Order.belongsTo(models.User)
//     // Seller.hasMany(Order)
//     // Order.belongsTo(models.Seller)   
//     Rating.belongsTo(models.User)
//     Rating.belongsTo(models.Seller)

// }

module.exports = Rating;

