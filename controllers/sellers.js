const _ = require('lodash');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const sellersDao = require('../dao/sellersDao')
const validateJwt = require('../middleware/auth')

router.post('/create', async (req, res) => {
    try {
        let result = await sellersDao.createNewSeller(req.body);

        res.send(result)
    } catch(err) {
        res.status(500).send(err)
    }
})

router.post('/authenticate', async (req, res) => {
    try {
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