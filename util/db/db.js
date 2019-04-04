const Sequelize = require('sequelize')
const config = require('config')


const sequelize = new Sequelize(config.get('database.databaseName'), config.get('database.username'), config.get('database.password'), {
  dialect: config.get('database.dialect'),
  host: config.get('database.host')
})

module.exports = sequelize;