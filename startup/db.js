const sequelize = require('../util/db/db')
module.exports = async() => {

    await sequelize.sync({force: true})
}