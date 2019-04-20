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

//TODO: replace this with a transaction.
ordersDao.createNewOrder = async(orderDetails) => {
    try {
        let user = await User.findByPk(orderDetails.userId)
        let seller = await Seller.findByPk(orderDetails.sellerId)

        let result = await Order.create({
            orderItem: orderDetails.orderItem,
            orderPrice: orderDetails.orderPrice,
            orderDate: Date.now()
        })

        result.setUser(user)
        result.setSeller(seller)

        await result.save()

        return result;

    } catch (err) {
        return err;
    }
}

ordersDao.getUserOrders = async (userId, pageNo, pageSize) => {
    try {
        let userOrders = await Order.findAll({   
            where: {
                userId: userId
            },
            offset: pageNo*pageSize, 
            limit: pageSize 
        })

        return userOrders;
    } catch (err) {
        return err;
    }
}

ordersDao.getSellerOrders = async (sellerId, pageNo, pageSize) => {
    try {
        let userOrders = await Order.findAll({   
            where: {
                sellerId: sellerId
            },
            offset: pageNo*pageSize, 
            limit: pageSize 
        })

        return userOrders;
    } catch (err) {
        return err;
    }
}

module.exports = ordersDao;