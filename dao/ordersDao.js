const sequelize = require('../util/db/db')
const seller = require('../models/seller')
const jwt = require('jsonwebtoken')
const utils = require('../util/utils')
const _ = require('lodash')
const config = require('config')
const bcrypt = require('bcrypt')
var ordersDao = {}
const Seller = require('../models/seller')
const User = require('../models/user')
const Order = require('../models/order')
const Transaction = require('../models/transaction')
const Op = require('sequelize').Op;


ordersDao.createNewOrder = async(orderDetails) => {
    try {
        let orderingUser = await User.findByPk(orderDetails.userId)
        let orderSellerTarget = await Seller.findByPk(orderDetails.sellerId)

        let result = await Order.create({
            orderItem: orderDetails.orderItem,
            orderPrice: orderDetails.orderPrice,
            orderDate: Date.now()
        })

        result.setUser(orderingUser)
        result.setSeller(orderSellerTarget)

        await result.save()

        return result;

    } catch (err) {
        return err;
    }
}


module.exports = ordersDao;