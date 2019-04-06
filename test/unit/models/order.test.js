const User = require('../../../models/user')
const Seller = require('../../../models/seller')
const Order = require('../../../models/order')
const jwt = require('jsonwebtoken');
const config = require('config');
const sequelize = require('../../../util/db/db')
const utils = require('../../../util/utils')
const dbinit = require('../../../startup/db')
// const User = 
const boilerplate = require('../../boilerplate')
const FAKE_USER_ID = 111111
const FAKE_SELLER_ID = 111112
const FAKE_ORDER_ID = 111113
jest.setTimeout(30000)
describe('order modelling', () => {
    beforeEach(boilerplate.dbTestInit)
    // beforeAll(async() =>  {
    //     let user = await 

    //     let seller  = await 

    //     await user.save()
    //     await seller.save()

    // })

    // afterAll(async () => {
    //     let order = await Order.findByPk(FAKE_ORDER_ID)
    //     let user = await User.findByPk(FAKE_USER_ID)
    //     let seller = await Seller.findByPk(FAKE_SELLER_ID)


    //     await order.destroy()
    //     await user.destroy()
    //     await seller.destroy()
    // })

    it('should make a new order with correct associations', async () => {
        try {
            let fakeUser = await User.create(
                {
                    id: FAKE_USER_ID,
                    userName: "Miho Kaneko",
                    userEmail: "ordertest@user.com",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    userHashedPassword: await utils.hashPassword("AIZAfefra"),
                    userBirthday: Date.now(),
                    userGender: 'female',
                    userAddress: 'sultan agung',
                    userPhoneNumber: '081255555555'
                }
            )
            // .then(async () => {
                // return 
            let fakeSeller = await Seller.create(
                {
                    id: FAKE_SELLER_ID,
                    sellerName: "Louis Rossmann",
                    sellerEmail: "ordertest@seller.com",
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '081255555555'
                    }
            )
            // })
            // .then(() => {
            let newOrder = await Order.create({
                id: FAKE_ORDER_ID,
                orderDate: Date.now(),
                orderItem: "Fix my iPhone, Louis Rossmann!",
                orderPrice: 400.0
                // User: orderUser,
                // Seller: orderSeller
            })
            // })
            // .then(newOrder => {
                // return 
            let orderUser = await User.findByPk(FAKE_USER_ID)            
            // })
            // .then(orderUser => {
            newOrder.setUser(orderUser)    
                // return 
            let orderSeller = await Seller.findByPk(FAKE_SELLER_ID)
            // })
            // .then(orderSeller => {
            newOrder.setSeller(orderSeller)
            // })
            // .then(() => {
                // return 
            await newOrder.save()
            // })
            // .then(result => {
                // return 
            let fetchedOrder = await Order.findByPk(FAKE_ORDER_ID);
            // })
            // .then(fetchedOrder => {
            
            let fakeOrderUser = await fetchedOrder.getUser()
            let fakeOrderSeller = await fetchedOrder.getSeller()

            console.log("id user: ", fakeOrderUser.id)
            console.log("id seller: ", fakeOrderSeller.id)
            
            expect(fakeOrderUser.id).toBe(FAKE_USER_ID)
            expect(fakeOrderSeller.id).toBe(FAKE_SELLER_ID)
            // done()
                
            // })
            // .catch(err => console.log(err))

            // .then(newOrder => {
            //     newOrder.save()
            // })
            // .then(async newOrder => {


            // })
    }
    catch (err) {
        console.log("error order test: ", err)
    }



        

        
    }) 
})