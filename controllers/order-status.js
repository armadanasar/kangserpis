const _ = require('lodash');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const sellersDao = require('../dao/sellersDao')
const orderStatusDao = require('../dao/orderStatusDao')
const validateJwt = require('../middleware/auth')
const validations = require('./validations/orders')

router.get('/updateOrderStatus', validateJwt, async (req, res) => {
    try {
        if (req.seller) {
            let body = req.body
            let {error} = validations['/updateOrderStatus'](body)
    
                    
            if (error) {
                return res.status(400).send(error)
            }
    
            if (req.seller.id !== req.body.sellerId) {
                return res.status(403).send({
                    'error': 'You are not authorized to see this.'
                })
            }
    
            let result = await orderStatusDao.updateOrderStatus(body.sellerId, body.orderId)
    
            return res.send(result)
        } else {
            res.send("You are not logged in as seller")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

router.get('/getOrderStatus', validateJwt, async (req, res) => {
    try {
        if (req.seller || req.user) {
            let body = req.body

            let {error} = validations['/getOrderStatus'](body)
    
                    
            if (error) {
                return res.status(400).send(error)
            }
    
            if (req.seller.id !== req.body.sellerId) {
                return res.status(403).send({
                    'error': 'You are not authorized to see this.'
                })
            }
    
            let sellerOrUserId = (req.seller) ? body.sellerId : body.userId
            let result = await orderStatusDao.getOrderStatus(sellerOrUserId, body.orderId)
    
            return res.send(result)
        } else {
            res.send("You are not logged in as seller")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

module.exports = router;