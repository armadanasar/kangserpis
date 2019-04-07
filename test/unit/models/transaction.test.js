const User = require('../../../models/user')
const Seller = require('../../../models/seller')
const Order = require('../../../models/order')
const OrderStatus = require('../../../models/order-status')
const jwt = require('jsonwebtoken');
const config = require('config');
const sequelize = require('../../../util/db/db')
const utils = require('../../../util/utils')
const dbinit = require('../../../startup/db')
const Transaction = require('../../../models/transaction')
// const User = 
const boilerplate = require('../../boilerplate')
// const FAKE_USER_ID = 111111
// const FAKE_SELLER_ID = 111112
// const FAKE_ORDER_ID = 111113
// const FAKE_ORDER_STATUS_ID = 111114
const {FAKE_USER_ID, FAKE_SELLER_ID, FAKE_ORDER_ID, FAKE_TRANSACTION_ID} = require('./modelTestConstants')

jest.setTimeout(30000)
describe('transaction modelling', () => {
    beforeEach(boilerplate.dbTestInit)

    it('should make a new transaction with correct associations', async () => {

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
 
            let newOrder = await Order.create({
                id: FAKE_ORDER_ID,
                orderDate: Date.now(),
                orderItem: "Fix my iPhone, Louis Rossmann!",
                orderPrice: 400.0
            })

            let orderUser = await User.findByPk(FAKE_USER_ID)            

            newOrder.setUser(orderUser)    

            let orderSeller = await Seller.findByPk(FAKE_SELLER_ID)

            newOrder.setSeller(orderSeller)

            await newOrder.save()

            let fetchedOrder = await Order.findByPk(FAKE_ORDER_ID);

            let fakeOrderUser = await fetchedOrder.getUser()
            let fakeOrderSeller = await fetchedOrder.getSeller()

            console.log("id user: ", fakeOrderUser.id)
            console.log("id seller: ", fakeOrderSeller.id)
            
            expect(fakeOrderUser.id).toBe(FAKE_USER_ID)
            expect(fakeOrderSeller.id).toBe(FAKE_SELLER_ID)
        
            let newTransaction = await Transaction.create({
                id: FAKE_TRANSACTION_ID,
                transactionPrice: fetchedOrder.orderPrice,
                transactionMessage: fetchedOrder.orderItem
            })

            newTransaction.setOrder(fetchedOrder)
            newTransaction.setUser(fakeOrderUser)
            newTransaction.setSeller(fakeOrderSeller)

            //associate it to respective order and seller
            
            await newTransaction.save()

            let fetchedTransaction = await Transaction.findByPk(FAKE_TRANSACTION_ID);
        
            let fakeTransactionOrder = await fetchedTransaction.getOrder()
            let fakeTransactionSeller = await fetchedTransaction.getSeller()
            let fakeTransactionUser = await fetchedTransaction.getUser()

            expect(fakeTransactionOrder.id).toBe(FAKE_ORDER_ID)
            expect(fakeTransactionSeller.id).toBe(FAKE_SELLER_ID)
            expect(fakeTransactionUser.id).toBe(FAKE_USER_ID)
            expect(fetchedTransaction.transactionPrice).toBe(fetchedOrder.orderPrice)
            expect(fetchedTransaction.transactionMessage).toBe(fetchedOrder.orderItem)
            
        }
        catch (err) {
            console.log("error order status model test: ", err)
            throw err;
        }
    }) 
})