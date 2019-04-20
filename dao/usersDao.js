const sequelize = require('../util/db/db')
const User = require('../models/user')
const userValidations = require('./validations/usersDao.validations')
const utils = require('../util/utils')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const Op = require('sequelize').Op
var usersDao = {}

//fungsi:
//make user
//edit user
//authenticate user and make jwt
//verify jwt and give user access to their data

usersDao.getUserByPk = async(pkId) => {
    try {
        let user = await User.findByPk(pkId)

        if (user) return user
        else return false
    } catch (err) {
        return err;
    }
}

usersDao.createNewUser = async (userDetails) => {
    // let {error} = userValidations.createNewUser(userDetails)

    // if (error)
        // throw new Error("")
    let existingUser = await User.findAll({
        where: {
        [Op.or]: [
            {
                userPhoneNumber: userDetails.userPhoneNumber
                
            }, 
            {
                userEmail: userDetails.userEmail
            }
        ]
    }
    })
    // console.log(existingSeller)
    if (existingUser.length > 0) {
        return false;
    }

    try {
        let newUser = await User.create({
            userName: userDetails.userName,
            userEmail: userDetails.userEmail,
            userHashedPassword: await utils.hashPassword(userDetails.userPassword),
            userBirthday: userDetails.userBirthday,
            userGender: userDetails.userGender,
            userAddress: userDetails.userAddress,
            userPhoneNumber: userDetails.userPhoneNumber
        })

        let result = _.pick(newUser, ['id', 'userName', 'userEmail', 'userBirthday', 'userGender', 'userAddress', 'userPhoneNumber'])

        return result;
    } catch (err) {
        throw err;
    }
}

usersDao.authenticateUser = async (phoneNumber, password) => {
    try {
        let user = await User.findAll({where: {userPhoneNumber: phoneNumber}})
    
        // let hashedPassword = await utils.hashPassword(password)
        let passwordsMatch = await bcrypt.compare(password, user[0].userHashedPassword)
        // if (seller.sellerHashedPassword)
    
        if (passwordsMatch) {
            let token =  jwt.sign({id: user[0].id, userPhoneNumber: user[0].userPhoneNumber, role: "user"}, config.get('jwtPrivateKey'));
            return token;
        } else {
            return false;
        }
    
    } catch(err) {
        throw err;
    }
}

module.exports = usersDao;