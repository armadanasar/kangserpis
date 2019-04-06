const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')
const utils = require('../util/utils')

const Seller = sequelize.define('seller', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sellerName: Sequelize.STRING,
    sellerEmail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    sellerHashedPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sellerBirthday: {
        type: Sequelize.DATE
    },
    sellerGender: {
        type: Sequelize.ENUM,
        values: ['male', 'female']
    },
    sellerAddress: {
        type: Sequelize.STRING
    },
    sellerPhoneNumber: {
        type: Sequelize.STRING
    }
}
// , {
//     classMethods: {
        
//     }
// }
)

// Seller.associate= function(models) {
//     Seller.hasMany(models.Order)   
//     Seller.hasMany(models.OrderStatus)
//     Seller.hasMany(model.Transaction)
// }
module.exports = Seller;

