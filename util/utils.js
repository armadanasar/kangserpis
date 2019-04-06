const bcrypt = require('bcrypt');
const config = require('config');

const utils = {}

utils.hashPassword = async (plaintextPassword) => {
    const salt = await bcrypt.genSalt(
        config.get("SALT_VALUE")
    );
    const hash = await bcrypt.hashSync(plaintextPassword, salt);
    console.log(hash)
    return hash;
}


module.exports = utils