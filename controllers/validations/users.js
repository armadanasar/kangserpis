// var Joi = require('joi')
const jwt = require('jsonwebtoken')
// const joiPhoneNumber = Joi.extend(require('joi-phone-number'));
const joiPhoneNumber = require('joi-phone-number')
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
var Joi = BaseJoi.extend([Extension, joiPhoneNumber]);
// Joi = BaseJoi.extend()
var userValidationSchemas = {}

userValidationSchemas['/create'] = (requestBody) => {
    const validationSchema = {
        userName: Joi.string().required(),
        userEmail: Joi.string().email({ minDomainAtoms: 2 }).required(),
        userPassword: Joi.string().min(6).required(),
        userBirthday: Joi.date().format('YYYY-MM-DD'),
        userGender: Joi.string().valid('male', 'female'),
        userAddress: Joi.string(),
        userPhoneNumber: Joi.string().phoneNumber().required()
    }

    return Joi.validate(requestBody, validationSchema)
}

userValidationSchemas['/authenticate'] = (requestBody) => {
    const validationSchema = {
        phoneNumber: Joi.string().phoneNumber().required(),
        password: Joi.string().required()
    }

    return Joi.validate(requestBody, validationSchema)
}


module.exports = userValidationSchemas

