const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const Review = sequelize.define('review', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    reviewText: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
// , {
//     classMethods: {
        
//     }
// }
)
// Review.associate = function(models) {
//     // OrderStatus.belongsTo(models.Order)
//     // Order.belongsTo(models.User)
//     // Seller.hasMany(Order)
//     // Order.belongsTo(models.Seller)   
//     Review.belongsTo(models.User)
//     Review.belongsTo(models.Seller)

// }
module.exports = Review;

