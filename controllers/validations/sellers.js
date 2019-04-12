// var Joi = require('joi')
const jwt = require('jsonwebtoken')
// const joiPhoneNumber = Joi.extend(require('joi-phone-number'));
const joiPhoneNumber = require('joi-phone-number')
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
var Joi = BaseJoi.extend([Extension, joiPhoneNumber]);
// Joi = BaseJoi.extend()
var sellerValidationSchemas = {}

sellerValidationSchemas['/create'] = (requestBody) => {
    const validationSchema = {
        sellerName: Joi.string().required(),
        sellerEmail: Joi.string().email({ minDomainAtoms: 2 }).required(),
        sellerPassword: Joi.string().min(6).required(),
        sellerBirthday: Joi.date().format('YYYY-MM-DD'),
        sellerGender: Joi.string().valid('male', 'female'),
        sellerAddress: Joi.string(),
        sellerPhoneNumber: Joi.string().phoneNumber().required()
    }

    let result = Joi.validate(requestBody, validationSchema)
    return result;
}

sellerValidationSchemas['/authenticate'] = (requestBody) => {
    const validationSchema = {
        phoneNumber: Joi.string().phoneNumber().required(),
        password: Joi.string().required()
    }

    return Joi.validate(requestBody, validationSchema)
}


module.exports = sellerValidationSchemas

