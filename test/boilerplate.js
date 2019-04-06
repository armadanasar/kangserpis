const sequelize = require('../util/db/db')

const boilerplate = {}
boilerplate.dbTestInit = (done) => {
    require('../util/db/enforceRelations')()

    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    .then(() => {
        return sequelize.sync({force: true})
    })
    .then(async () => {
        done()
    })
    .catch(err => console.log("sync err: ", err))
}

module.exports = boilerplate