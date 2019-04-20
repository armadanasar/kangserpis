const sequelize = require('../util/db/db')
const seller = require('../models/seller')
const jwt = require('jsonwebtoken')
const utils = require('../util/utils')
const _ = require('lodash')
const config = require('config')
const bcrypt = require('bcrypt')
var sellersDao = {}
const Seller = require('../models/seller')
const Op = require('sequelize').Op;
//fungsi:
//make seller
//edit seller
//authenticate seller and make jwt
//verify jwt and give seller access to their data
sellersDao.getSellerByPk = async(pkId) => {
    try {
        let seller = await Seller.findByPk(pkId)

        if (seller) return seller
        else return false
    } catch (err) {
        return err;
    }
}

sellersDao.createNewSeller = async (sellerDetails) => {
    try {
        console.log(sellerDetails.sellerPhoneNumber)
        console.log(sellerDetails.sellerEmail)
        let existingSeller = await Seller.findAll({
            where: {
            [Op.or]: [
                {
                    sellerPhoneNumber: sellerDetails.sellerPhoneNumber
                    
                }, 
                {
                    sellerEmail: sellerDetails.sellerEmail
                }
            ]
        }
        })
        // console.log(existingSeller)
        if (existingSeller.length > 0) {
            return false;
        }

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

sellersDao.getSellers = async (pageNo, pageSize) => {
    try {
        let result = await Seller.findAll({   
            attributes: ['sellerName', 'sellerPhoneNumber', 'sellerEmail'], 
            offset: pageNo*pageSize, 
            limit: pageSize 
        })

        return result;
    } catch (err) {
        return err;
    }
}

module.exports = sellersDao;