const sequelize = require('../util/db/db')
module.exports = async () => {
    require('../util/db/enforceRelations')()
    try {
        await sequelize.sync()
    }
    
    catch(err) {console.log("sync err: ", err)}
}

