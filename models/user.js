const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


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
})

module.exports = User;

