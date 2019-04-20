const _ = require('lodash');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const sellersDao = require('../dao/sellersDao')
const validateJwt = require('../middleware/auth')
const validations = require('./validations/orders')

router.post('/create', validateJwt, async (req, res) => {
    try {

        //must be user to create order!
        //else, that would have been crazy!
        if (req.user) {

            let {error} = validations['/create'](req.body)

            if (error) {
                return res.status(400).send(error)
            }

            let orderDetail = req.body

            //create order here

            // let user = await usersDao.getUserByPk(orderDetail.userId)
            // let seller = await sellersDao.getSellerByPk(orderDetail.sellerId)

            let newOrder = await ordersDao.createNewOrder(orderDetail)

            if (newOrder) return res.send(newOrder)
            else return res.status(500).send("unknown error")
        } else {
            return res.status(400).send("To create order, you must sign in as user.")
        }        
    } catch(err) {
        return res.status(500).send(err)
    }
})

router.post('/authenticate', async (req, res) => {
    try {
        let {error} = validations['/authenticate'](req.body)

        if (error) {
            return res.status(400).send(error)
        }

        let token = await sellersDao.authenticateSeller(req.body.phoneNumber, req.body.password)
    
        if (token) {
            res.send({
                token: token
            })
        } else {
            res.status(400).send("invalid password")
        }
    } catch(err) {
        res.status(500).send(err)
    }
})

router.get('/showSellerOrder', validateJwt, async (req, res) => {
    if (req.seller) {
        res.send(req.seller)
    } else {
        res.send("You are not logged in as seller")
    }
})

router.post('/showUserOrders', validateJwt, async(req, res) => {
    try {
        let {error} = validations['/showAll'](req.body)
        
        if (error) {
            return res.status(400).send(error)
        }

        let result = await sellersDao.getSellers(req.body.pageNo, req.body.pageSize)
    
        if (!result) {
            return res.status(500).send('unknown error!')
        }

        return res.send(result)
    } catch(err) {
        console.log(err)
        return res.status(500).send(err)
    }
})

module.exports = router;