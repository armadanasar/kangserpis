const sequelize = require('../util/db/db')
const seller = require('../models/seller')
const jwt = require('jsonwebtoken')
const utils = require('../util/utils')
const _ = require('lodash')
const config = require('config')
const bcrypt = require('bcrypt')
var sellersDao = {}
const Seller = require('../models/seller')
//fungsi:
//make seller
//edit seller
//authenticate seller and make jwt
//verify jwt and give seller access to their data

sellersDao.createNewSeller = async (sellerDetails) => {
    try {
        let newSeller = await Seller.create({
            sellerName: sellerDetails.sellerName,
            sellerEmail: sellerDetails.sellerEmail,
            sellerHashedPassword: await utils.hashPassword(sellerDetails.sellerPassword),
            sellerBirthday: sellerDetails.sellerBirthday,
            sellerGender: sellerDetails.sellerGender,
            sellerAddress: sellerDetails.sellerAddress,
            sellerPhoneNumber: sellerDetails.sellerPhoneNumber
        })
        
        await newSeller.save()

        let result = _.pick(newSeller, ['id', 'sellerName', 'sellerEmail', 'sellerBirthday', 'sellerGender', 'sellerAddress', 'sellerPhoneNumber'])
        return result;
    } catch (err) {
        return err;
    }
}

sellersDao.authenticateSeller = async (phoneNumber, password) => {
    try {
        let seller = await Seller.findAll({where: {sellerPhoneNumber: phoneNumber}})
    
        // let hashedPassword = await utils.hashPassword(password)
        let passwordsMatch = await bcrypt.compare(password, seller[0].sellerHashedPassword)
        // if (seller.sellerHashedPassword)
    
        if (passwordsMatch) {
            return jwt.sign({id: seller[0].id, sellerPhoneNumber: seller[0].sellerPhoneNumber, role: "seller"}, config.get('jwtPrivateKey'));
        } else {
            return false;
        }
    
    } catch(err) {
        return err;
    }
}

module.exports = sellersDao;