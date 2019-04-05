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
})

module.exports = Rating;

