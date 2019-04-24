const ordersDao = require('../../../dao/ordersDao');
// require('../../dao')
const usersDao = require('../../../dao/usersDao');
const sellersDao = require('../../../dao/sellersDao');
const boilerplate = require('../../boilerplate')
const jwt = require('jsonwebtoken')
const config = require('config');
const _ = require('lodash')

describe('ordersDao test', () => {
    beforeEach(boilerplate.dbTestInit)
    it('should create a new order', async() => {
        try {
            let sellerDetails = {
                sellerName: "alief",
                sellerEmail: "alief@gmail.com",
                sellerPassword: "alief123",
                sellerBirthday: "1999-04-12",
                sellerGender: "male",
                sellerAddress: "deket binus",
                sellerPhoneNumber: "+62777777777"
            }
            let userDetails = {
                userName: "alief",
                userEmail: "alief@gmail.com",
                userPassword: "alief123",
                userBirthday: "1999-04-12",
                userGender: "male",
                userAddress: "deket binus",
                userPhoneNumber: "+62777777777"
            }

            let orderDetails = {
                orderItem: "fix my iMac",
                orderPrice: 500.0
            }

            let seller = await sellersDao.createNewSeller(sellerDetails)
            let user = await usersDao.createNewUser(userDetails)
        
            orderDetails['userId'] = user.id
            orderDetails['sellerId'] = seller.id

            console.log(JSON.stringify(orderDetails))
            
            let newOrder = await ordersDao.createNewOrder(orderDetails)
        
        } catch (err) {
            throw err;
        }
    })



    it('should return orders made by specified user', async() => {
        try {
            let sellerDetails = [
                {
                    sellerName: "alief",
                    sellerEmail: "alief@gmail.com",
                    sellerPassword: "alief123",
                    sellerBirthday: "1999-04-12",
                    sellerGender: "male",
                    sellerAddress: "deket binus",
                    sellerPhoneNumber: "+62777777777"
                },
                {
                    sellerName: "alief",
                    sellerEmail: "alief@ymail.com",
                    sellerPassword: "alief123",
                    sellerBirthday: "1999-04-12",
                    sellerGender: "male",
                    sellerAddress: "deket binus",
                    sellerPhoneNumber: "+6767676776776"
                },
                {
                    sellerName: "alief",
                    sellerEmail: "alief@ailment.com",
                    sellerPassword: "alief123",
                    sellerBirthday: "1999-04-12",
                    sellerGender: "male",
                    sellerAddress: "deket binus",
                    sellerPhoneNumber: "+444444444"
                }
            ]

            let userDetails = [
                {
                    userName: "alief",
                    userEmail: "alief@gmail.com",
                    userPassword: "alief123",
                    userBirthday: "1999-04-12",
                    userGender: "male",
                    userAddress: "deket binus",
                    userPhoneNumber: "+62777777777"
                },
                {
                    userName: "alief",
                    userEmail: "alief@ymail.com",
                    userPassword: "alief123",
                    userBirthday: "1999-04-12",
                    userGender: "male",
                    userAddress: "deket binus",
                    userPhoneNumber: "+6767676776776"
                },
                {
                    userName: "alief",
                    userEmail: "alief@ailment.com",
                    userPassword: "alief123",
                    userBirthday: "1999-04-12",
                    userGender: "male",
                    userAddress: "deket binus",
                    userPhoneNumber: "+444444444"
                }
            ]

            let orderDetails = {
                orderItem: "fix my iMac",
                orderPrice: 500.0
            }
            let sellers = []
            let users = []
            for (let sellerDetail of sellerDetails) {
                let seller = await sellersDao.createNewSeller(sellerDetail)
                sellers.push(seller)
            }

            for (let userDetail of userDetails) {
                let user = await usersDao.createNewUser(userDetail)
                users.push(user)
            }

            // let seller = await sellersDao.createNewSeller(sellerDetails)
            // let user = await usersDao.createNewUser(userDetails)
            
            for (let i = 0; i < 3; i++) {
                let user = users[i]
                let seller = sellers[i]

                for (let i = 0; i < 4; i++) {
                    let orderDetails = {
                        orderItem: "fix my iMac",
                        orderPrice: 500.0 * (i+1)
                    }
                    orderDetails['userId'] = user.id
                    orderDetails['sellerId'] = seller.id
    
                    console.log(JSON.stringify(orderDetails))
                
                    let newOrder = await ordersDao.createNewOrder(orderDetails)
                }
            }
            
            for (let i = 0; i < 3; i++) {
                let userOrders = await ordersDao.getUserOrders(users[i].id, 0, 50)
                console.log()
                let prices = _.map(userOrders, 'orderPrice')
                let userIds = Array.from(new Set(_.map(userOrders, 'userId')))


                expect(prices.length).toBe(4)
                expect(userIds).toEqual(expect.arrayContaining([
                    users[i].id
                ]))
            }
            
            let userOrdersPaginationTest = await ordersDao.getUserOrders(users[0].id, 0, 1)
        
            expect(userOrdersPaginationTest.length).toBe(1)

        } catch (err) {
            throw err;
        }
    })

    it('should return orders targeted to specified seller', async() => {
        try {
            let sellerDetails = [
                {
                    sellerName: "alief",
                    sellerEmail: "alief@gmail.com",
                    sellerPassword: "alief123",
                    sellerBirthday: "1999-04-12",
                    sellerGender: "male",
                    sellerAddress: "deket binus",
                    sellerPhoneNumber: "+62777777777"
                },
                {
                    sellerName: "alief",
                    sellerEmail: "alief@ymail.com",
                    sellerPassword: "alief123",
                    sellerBirthday: "1999-04-12",
                    sellerGender: "male",
                    sellerAddress: "deket binus",
                    sellerPhoneNumber: "+6767676776776"
                },
                {
                    sellerName: "alief",
                    sellerEmail: "alief@ailment.com",
                    sellerPassword: "alief123",
                    sellerBirthday: "1999-04-12",
                    sellerGender: "male",
                    sellerAddress: "deket binus",
                    sellerPhoneNumber: "+444444444"
                }
            ]

            let userDetails = [
                {
                    userName: "alief",
                    userEmail: "alief@gmail.com",
                    userPassword: "alief123",
                    userBirthday: "1999-04-12",
                    userGender: "male",
                    userAddress: "deket binus",
                    userPhoneNumber: "+62777777777"
                },
                {
                    userName: "alief",
                    userEmail: "alief@ymail.com",
                    userPassword: "alief123",
                    userBirthday: "1999-04-12",
                    userGender: "male",
                    userAddress: "deket binus",
                    userPhoneNumber: "+6767676776776"
                },
                {
                    userName: "alief",
                    userEmail: "alief@ailment.com",
                    userPassword: "alief123",
                    userBirthday: "1999-04-12",
                    userGender: "male",
                    userAddress: "deket binus",
                    userPhoneNumber: "+444444444"
                }
            ]

            let orderDetails = {
                orderItem: "fix my iMac",
                orderPrice: 500.0
            }
            let sellers = []
            let users = []
            for (let sellerDetail of sellerDetails) {
                let seller = await sellersDao.createNewSeller(sellerDetail)
                sellers.push(seller)
            }

            for (let userDetail of userDetails) {
                let user = await usersDao.createNewUser(userDetail)
                users.push(user)
            }

            // let seller = await sellersDao.createNewSeller(sellerDetails)
            // let user = await usersDao.createNewUser(userDetails)
            
            for (let i = 0; i < 3; i++) {
                let user = users[i]
                let seller = sellers[i]

                for (let i = 0; i < 4; i++) {
                    let orderDetails = {
                        orderItem: "fix my iMac",
                        orderPrice: 500.0 * (i+1)
                    }
                    orderDetails['userId'] = user.id
                    orderDetails['sellerId'] = seller.id
    
                    console.log(JSON.stringify(orderDetails))
                
                    let newOrder = await ordersDao.createNewOrder(orderDetails)
                }
            }
            
            for (let i = 0; i < 3; i++) {
                let sellerOrders = await ordersDao.getSellerOrders(sellers[i].id, 0, 50)
                console.log()
                let prices = _.map(sellerOrders, 'orderPrice')
                let sellerIds = Array.from(new Set(_.map(sellerOrders, 'sellerId')))


                expect(prices.length).toBe(4)
                expect(sellerIds).toEqual(expect.arrayContaining([
                    sellers[i].id
                ]))
            }
            
            let sellerOrdersPaginationTest = await ordersDao.getSellerOrders(sellers[0].id, 0, 1)
        
            expect(sellerOrdersPaginationTest.length).toBe(1)
            
        } catch (err) {
            throw err;
        }
    })
})