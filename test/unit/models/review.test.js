const User = require('../../../models/user')
const Seller = require('../../../models/seller')
const Order = require('../../../models/order')
const Review = require('../../../models/review')
// const OrderStatus = require('../../../models/order-status')
const jwt = require('jsonwebtoken');
const config = require('config');
const sequelize = require('../../../util/db/db')
const utils = require('../../../util/utils')
const dbinit = require('../../../startup/db')
// const User = 
const boilerplate = require('../../boilerplate')
// const FAKE_USER_ID = 111111
// const FAKE_SELLER_ID = 111112
// const FAKE_ORDER_ID = 111113
// const FAKE_ORDER_STATUS_ID = 111114
// const FAKE_REVIEW_ID = 111115
const {FAKE_USER_ID, FAKE_SELLER_ID, FAKE_ORDER_ID, FAKE_REVIEW_ID} = require('./modelTestConstants')

jest.setTimeout(30000)
describe('review modelling', () => {
    beforeEach(boilerplate.dbTestInit)

    it('should make a new review with correct associations', async () => {

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
        
        
            let newReview = await Review.create({
                id: FAKE_REVIEW_ID,
                reviewText: "woi ganti hape gw makin ancur lu benerin!"
            })

            newReview.setOrder(fetchedOrder)
            newReview.setSeller(fakeSeller)
            newReview.setUser(fakeUser)

            await newReview.save()

            let fetchedReview = await Review.findByPk(FAKE_REVIEW_ID);
        
            let fakeReviewOrder = await fetchedReview.getOrder()
            let fakeReviewSeller = await fetchedReview.getSeller()
            let fakeReviewUser = await fetchedReview.getUser()

            expect(fakeReviewOrder.id).toBe(FAKE_ORDER_ID)
            expect(fakeReviewSeller.id).toBe(FAKE_SELLER_ID)
            expect(fakeReviewUser.id).toBe(FAKE_USER_ID)
            expect(fetchedReview.reviewText).toMatch("woi ganti hape gw makin ancur lu benerin!")
        }
        catch (err) {
            console.log("error review model test: ", err)
            throw err;
        }
    }) 
})