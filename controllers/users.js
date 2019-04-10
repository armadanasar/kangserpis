const _ = require('lodash');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const usersDao = require('../dao/usersDao')
const validateJwt = require('../middleware/auth')
const validations = require('./validations/users')

router.post('/create', async (req, res) => {
    try {
        let {error} = validations['/create']()

        if (error) {
            return res.status(400).send(error)
        }

        let result = await usersDao.createNewUser(req.body);

        return res.send(result)
    } catch(err) {
        return res.status(500).send(err)
    }
})

router.post('/authenticate', async (req, res) => {
    try {
        let {error} = validations['/authenticate']()

        if (error) {
            return res.status(400).send(error)
        }

        let token = await usersDao.authenticateUser(req.body.phoneNumber, req.body.password)
    
        if (token) {
            return res.send({
                token: token
            })
        } else {
            return res.status(400).send("invalid password")
        }
    } catch(err) {
        return res.status(500).send(err)
    }
})

router.get('/authenticationStatus', validateJwt, (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.send("You are not logged in as users")
    }
})


module.exports = router;