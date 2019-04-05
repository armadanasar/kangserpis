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
})

module.exports = Review;

