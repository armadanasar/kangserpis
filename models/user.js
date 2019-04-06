const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')
// const utils = require('../util/utils')
const {hashPassword} = require('../util/utils')

const Seller = require('./seller')
const OrderStatus = require('./order-status');
const Promo = require('./promo');
const Rating = require('./rating');
const Review = require('./review');
const Transaction = require('./transaction')
const Order = require('./order')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName: Sequelize.STRING,
    userEmail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    userHashedPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userBirthday: {
        type: Sequelize.DATE
    },
    userGender: {
        type: Sequelize.ENUM,
        values: ['male', 'female']
    },
    userAddress: {
        type: Sequelize.STRING
    },
    userPhoneNumber: {
        type: Sequelize.STRING
    }
}
// , {
//     classMethods: {
//         associate: 
//     }
// }
)
// User.associate = function(models) {
//     User.hasMany(models.Order)   
//     User.hasMany(models.OrderStatus)
//     User.hasMany(models.Transaction)
// }
module.exports = User;

