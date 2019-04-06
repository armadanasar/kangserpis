const User = require('../../../models/user')
const Seller = require('../../../models/seller')
const jwt = require('jsonwebtoken');
const config = require('config');
const sequelize = require('../../../util/db/db')
const utils = require('../../../util/utils')
const dbinit = require('../../../startup/db')
jest.setTimeout(30000)
const boilerplate = require('../../boilerplate')
describe('user modelling', () => {
    beforeEach( /*(done) => {
        sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
        .then(() => {
            return sequelize.sync({force: true})
        })
        .then(async () => {
            done()
        })
        .catch(err => console.log("sync err: ", err))
    }*/ boilerplate.dbTestInit)
    it('should create a new user', async() => {
        try {
            let newUser = await User.create(
                {
                    id: 999,
                    userName: "Miho Kaneko",
                    userEmail: "miho@ggggggg.id",
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

            await newUser.save()

            let createdUser = await User.findByPk(999)

            expect(createdUser.userName).toBe("Miho Kaneko")
            expect(createdUser.userHashedPassword).toEqual(expect.not.stringContaining("AIZAfefra"))
        } catch (err) {
            console.log(err)
        }
    }) 

    it('should refuse to create a new user given invalid gender value', async() => {
        let message = false
        try {
            let newUser = await User.create(
                {
                    id: 1024,
                    userName: "Miho Kaneko",
                    userEmail: "miho@ggggggg.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    userHashedPassword: await utils.hashPassword("AIZAfefra"),
                    userBirthday: Date.now(),
                    userGender: 'laptops',
                    userAddress: 'sultan agung',
                    userPhoneNumber: '081255555555'
                }
            )

            await newUser.save()
        } catch (err) {
            message = err;
        }

        expect(message).toBeTruthy()
    }) 
})