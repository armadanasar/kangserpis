const jwt = require('jsonwebtoken');
const config = require('config');
const Seller = require('../models/user');

function auth(req, res, next) {
    let token = req.header('X-Auth-Token');
    if (!token) return res.status(401).send('no token given');

    try {
        let decodedToken = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log(decodedToken);

        if (decodedToken.role === "seller") {
            req.seller = decodedToken
        }
        else if (decodedToken.role === "user") {
            req.user = decodedToken;
        }

        next();
    }
    catch (ex) {
        console.log(ex.message)
        return res.status(401).send('invalid token mofo')
    }
}

module.exports = auth;