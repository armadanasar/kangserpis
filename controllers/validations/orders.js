// var Joi = require('joi')
const jwt = require('jsonwebtoken')
// const joiPhoneNumber = Joi.extend(require('joi-phone-number'));
const joiPhoneNumber = require('joi-phone-number')
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
var Joi = BaseJoi.extend([Extension, joiPhoneNumber]);
// Joi = BaseJoi.extend()
var orderValidationSchemas = {}

orderValidationSchemas['/create'] = (requestBody) => {
    const validationSchema = {
        userId: Joi.number().required(),
        sellerId: Joi.number().required(),
        orderItem: Joi.string().required(),
        orderPrice: Joi.number().required()
    }

    let result = Joi.validate(requestBody, validationSchema)
    return result;
}

orderValidationSchemas['/showUserOrders'] = (requestBody) => {
    const validationSchema = {
        userId: Joi.number().required(),
        pageNo: Joi.number().min(0).required(),
        pageSize: Joi.number().min(1).required()
        
    }

    return Joi.validate(requestBody, validationSchema)
}

orderValidationSchemas['/showSellerOrders'] = (requestBody) => {
    const validationSchema = {
        sellerId: Joi.number().required(),
        pageNo: Joi.number().min(0).required(),
        pageSize: Joi.number().min(1).required()
    }

    return Joi.validate(requestBody, validationSchema)
}
module.exports = orderValidationSchemas

