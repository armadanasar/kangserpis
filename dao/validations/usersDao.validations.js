const Joi = require('joi')
const jwt = require('jsonwebtoken')

var userValidationSchemas = {}

userValidationSchemas.createNewUser = (requestBody) => {
    const validationSchema = {
        userName: Joi.string().required(),
        userEmail: Joi.string().email({ minDomainAtoms: 2 }).required(),
        userPassword: Joi.string().min(6).required(),
        userBirthday: Joi.date().format('YYYY-MM-DD'),
        userGender: Joi.string().valid('male', 'female'),
        userAddress: Joi.string(),
        userPhoneNumber: Joi.string().min(8).required()
    }

    return Joi.validate(requestBody, validationSchema)
}


module.exports = userValidationSchemas

