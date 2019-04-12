const _ = require('lodash');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const sellersDao = require('../dao/sellersDao')
const validateJwt = require('../middleware/auth')
const validations = require('./validations/sellers')

router.post('/create', async (req, res) => {
    try {
        let {error} = validations['/create'](req.body)

        if (error) {
            return res.status(400).send(error)
        }

        let result = await sellersDao.createNewSeller(req.body);

        res.send(result)
    } catch(err) {
        res.status(500).send(err)
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

router.get('/authenticationStatus', validateJwt, async (req, res) => {
    if (req.seller) {
        res.send(req.seller)
    } else {
        res.send("You are not logged in as seller")
    }
})


module.exports = router;