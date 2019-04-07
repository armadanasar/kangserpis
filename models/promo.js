const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const Promo = sequelize.define('promo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    promoMessage: {
        type: Sequelize.STRING
    },
    promoCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    /**Arbitrary js for this is cool btw :) */
    promoDiscount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    promoStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP') 
    },
    promoEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        
    }
}
// , {
//     classMethods: {

//     }
// }
)

// Promo.associate= function(models) {
//     // OrderStatus.belongsTo(models.Order)
//     // Order.belongsTo(models.User)
//     // Seller.hasMany(Order)
//     // Order.belongsTo(models.Seller)   
//     Promo.belongsTo(models.Seller)

// }

module.exports = Promo;

