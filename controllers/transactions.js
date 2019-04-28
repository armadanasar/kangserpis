const _ = require('lodash');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const sellersDao = require('../dao/sellersDao')
const transactionsDao = require('../dao/transactionsDao')
const validateJwt = require('../middleware/auth')
const validations = require('./validations/orders')

router.get('/acceptOrder', validateJwt, async (req, res) => {
    try {
        if (req.seller) {
            let body = req.body
            let {error} = validations['/acceptOrder'](body)
    
                    
            if (error) {
                return res.status(400).send(error)
            }
    
            if (req.seller.id !== req.body.sellerId) {
                return res.status(403).send({
                    'error': 'You are not authorized to see this.'
                })
            }
    
            let result = await transactionsDao.acceptOrder(body.sellerId, body.orderId)
    
            return res.send(result)
        } else {
            res.send("You are not logged in as seller")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }

})

router.get('/declineOrder', validateJwt, async (req, res) => {
    try {
        if (req.seller) {
            let body = req.body
            let {error} = validations['/declineOrder'](body)
    
                    
            if (error) {
                return res.status(400).send(error)
            }
    
            if (req.seller.id !== req.body.sellerId) {
                return res.status(403).send({
                    'error': 'You are not authorized to see this.'
                })
            }
    
            let result = await transactionsDao.declineOrder(body.sellerId, body.orderId)
    
            return res.send(result)
        } else {
            res.send("You are not logged in as seller")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }

})


router.get('/finalizeTransaction', validateJwt, async (req, res) => {
    try {
        if (req.seller) {
            let body = req.body
            let {error} = validations['/declineOrder'](body)
    
                    
            if (error) {
                return res.status(400).send(error)
            }
    
            if (req.seller.id !== req.body.sellerId) {
                return res.status(403).send({
                    'error': 'You are not authorized to see this.'
                })
            }
    
            let result = await transactionsDao.declineOrder(body.sellerId, body.orderId)
    
            return res.send(result)
        } else {
            res.send("You are not logged in as seller")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }

})

router.post('/showSellerTransactions', validateJwt, async(req, res) => {
    try {
        if (req.user) {
            let body = req.body
            let {error} = validations['/showSellerTransactions'](body)
    
                    
            if (error) {
                return res.status(400).send(error)
            }
    
            if (req.user.id !== req.body.userId) {
                return res.status(403).send({
                    'error': 'You are not authorized to see this.'
                })
            }
    
            let result = await ordersDao.getUserOrders(body.sellerId, body.pageNo, body.pageSize)
    
            return res.send(result)
        } else {
            res.send("You are not logged in as seller")
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

router.post('/showUserTransactions', validateJwt, async(req, res) => {
    try {
        if (req.user) {
            let body = req.body
            let {error} = validations['/showUserTransactions'](body)
    
                    
            if (error) {
                return res.status(400).send(error)
            }
    
            if (req.user.id !== req.body.userId) {
                return res.status(403).send({
                    'error': 'You are not authorized to see this.'
                })
            }
    
            let result = await ordersDao.getUserOrders(body.sellerId, body.pageNo, body.pageSize)
    
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