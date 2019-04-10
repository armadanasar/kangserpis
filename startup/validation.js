const Joi = require('joi');
module.exports = function() {
    // Joi.phoneNumber = require('joi-phone-number')(Joi)
    Joi.extend(require('joi-phone-number'))
}