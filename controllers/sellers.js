const _ = require('lodash');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const sellersDao = require('../dao/sellersDao')
const validateJwt = require('../middleware/auth')

router.post('/create', (req, res) => {

})

router.post('/authenticate', (req, res) => {

})

router.get('/authenticationStatus', validateJwt, (req, res) => {
    if (req.seller) {
        res.send(req.seller)
    } else {
        res.send("You are not logged in as seller")
    }
})


module.exports = router;