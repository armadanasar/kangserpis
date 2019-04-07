const Joi = require('joi')

var sellerValidationSchemas = {}
userValidationSchemas.createNewUser = (requestBody) => {
    const validationSchema = {
        sellerName: Joi.string().required(),
        sellerEmail: Joi.string().email({ minDomainAtoms: 2 }).required(),
        sellerPassword: Joi.string().min(6).required(),
        sellerBirthday: Joi.date().format('YYYY-MM-DD'),
        sellerGender: Joi.string().valid('male', 'female'),
        sellerAddress: Joi.string(),
        sellerPhoneNumber: Joi.string().min(8).required()
    }

    return Joi.validate(requestBody, validationSchema)
}


module.exports = sellerValidationSchemas
