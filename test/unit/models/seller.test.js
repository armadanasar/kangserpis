const User = require('../../../models/user')
const Seller = require('../../../models/seller')
const jwt = require('jsonwebtoken');
const config = require('config');
const sequelize = require('../../../util/db/db')
const utils = require('../../../util/utils')
const dbinit = require('../../../startup/db')
jest.setTimeout(30000)
const boilerplate = require('../../boilerplate')
describe('seller modelling', () => {
    beforeEach( /*(done) => {
        // require('../../../util/db/enforceRelations')()
        sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
        .then(() => {
            return sequelize.sync({force: true})
        })
        .then(async () => {
            done()
        })
        .catch(err => console.log("sync err: ", err))
    }*/boilerplate.dbTestInit)
    it('should create a new seller', async() => {
        try {
            let newSeller = await Seller.create(
                {
                    id: 434,
                    sellerName: "Miho Kaneko",
                    sellerEmail: "miho@ggggggg.id",
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '081255555555'
                }
            )

            await newSeller.save()

            let createdSeller = await Seller.findByPk(434)

            expect(createdSeller.sellerName).toBe("Miho Kaneko")
            expect(createdSeller.userHashedPassword).toEqual(expect.not.stringContaining("AIZAfefra"))
        }
        catch(err) {
            console.log(err)
        }
    })  
})