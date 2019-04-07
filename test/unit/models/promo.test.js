const User = require('../../../models/user')
const Seller = require('../../../models/seller')
const Order = require('../../../models/order')
const OrderStatus = require('../../../models/order-status')
const jwt = require('jsonwebtoken');
const config = require('config');
const sequelize = require('../../../util/db/db')
const utils = require('../../../util/utils')
const dbinit = require('../../../startup/db')
const Promo = require('../../../models/promo')
// const User = 
const boilerplate = require('../../boilerplate')
// const FAKE_USER_ID = 111111
// const FAKE_SELLER_ID = 111112
// const FAKE_ORDER_ID = 111113
// const FAKE_ORDER_STATUS_ID = 111114
const {FAKE_SELLER_ID, FAKE_PROMO_ID} = require('./modelTestConstants')

jest.setTimeout(30000)
describe('transaction modelling', () => {
    beforeEach(boilerplate.dbTestInit)

    it('should make a new transaction with correct associations', async () => {

        try {
 
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
 
            let newPromoEndDate = new Date("2019")
            let newPromo = await Promo.create({
                id: FAKE_PROMO_ID,
                promoMessage: "Selamat, anda mendapatkan harapan palsu!",
                promoCode: "fakepromo",
                /**Arbitrary js for this is cool btw :) */
                promoDiscount: 0.3,
                promoEndDate: newPromoEndDate
            })

            newPromo.setSeller(fakeSeller)

            await newPromo.save()

            let fetchedPromo = await Promo.findByPk(FAKE_PROMO_ID)
            let fakePromoSeller = await fetchedPromo.getSeller()

            expect(fakePromoSeller.id).toBe(FAKE_SELLER_ID)
            expect(fetchedPromo.promoMessage).toBe("Selamat, anda mendapatkan harapan palsu!")
            expect(fetchedPromo.promoCode).toBe("fakepromo")
            expect(fetchedPromo.promoDiscount).toBe(0.3)
            expect(fetchedPromo.promoStartDate <= Date.now()).toBe(true)
            //will be asserted later
            // expect(fetchedPromo.promoEndDate).toBe(newPromoEndDate)
        }
        catch (err) {
            console.log("error order status model test: ", err)
            throw err;
        }
    }) 
})