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
        type: Sequelize.STRING,
        allowNull: false
    },
    promoStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now()
    }
})

module.exports = Promo;

