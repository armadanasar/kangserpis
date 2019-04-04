const Sequelize = require('sequelize')
const sequelize = require('../util/db/db')


const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female']
    },
    isServiceProvider: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = User;

