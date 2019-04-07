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
    beforeEach(boilerplate.dbTestInit)
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
            expect(createdSeller.sellerEmail).toBe("miho@ggggggg.id")
            expect(createdSeller.sellerHashedPassword).toEqual(expect.not.stringContaining("AIZAfefra"))
            expect(createdSeller.sellerGender).toBe('female')
            expect(createdSeller.sellerAddress).toBe('sultan agung')
            expect(createdSeller.sellerPhoneNumber).toBe('081255555555')
        }
        catch(err) {
            console.log("error seller model test", err)
            throw err
        }
    })  

    it('should refuse to create a new seller given phone number previously used up in previous account', async() => {
        let message = false
        try {
            let newSeller = await Seller.create(
                {
                    id: 1024,
                    sellerName: "Miho Kaneko",
                    sellerEmail: "miho@ggggggg.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '081255555555'
                }
            )

            await newSeller.save()

            let failingSeller = await Seller.create(
                {
                    id: 1024,
                    sellerName: "Swift Taylor",
                    sellerEmail: "taylor@s.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan tajir',
                    sellerPhoneNumber: '081255555555'
                }
            )

            await failingSeller.save()
        } catch (err) {
            message = err;
        }

        expect(message).toBeTruthy()
    }) 

    it('should refuse to create a new seller given email address previously used up in previous account', async() => {
        let message = false
        try {
            let newSeller = await Seller.create(
                {
                    id: 1024,
                    sellerName: "Miho Kaneko",
                    sellerEmail: "miho@ggggggg.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '081255555555'
                }
            )

            await newSeller.save()

            let failingSeller = await Seller.create(
                {
                    id: 1024,
                    sellerName: "Miho Kaneko",
                    sellerEmail: "miho@ggggggg.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '08562142222'
                }
            )

            await failingSeller.save()
        } catch (err) {
            message = err;
        }

        expect(message).toBeTruthy()
    }) 


    it('should refuse to create a new seller given no name input given', async() => {
        let message = false
        try {
            let newSeller = await Seller.create(
                {
                    id: 1024,
                    sellerEmail: "miho@ggggggg.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '081255555555'
                }
            )

            await newSeller.save()
        } catch (err) {
            message = err;
        }

        expect(message).toBeTruthy()
    }) 

    it('should refuse to create a new seller given invalid gender value', async() => {
        let message = false
        try {
            let newSeller = await Seller.create(
                {
                    id: 1024,
                    sellerName: "Miho Kaneko",
                    sellerEmail: "miho@ggggggg.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    sellerHashedPassword: await utils.hashPassword("AIZAfefra"),
                    sellerBirthday: Date.now(),
                    sellerGender: 'laptops',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '081255555555'
                }
            )

            await newSeller.save()
        } catch (err) {
            message = err;
        }

        expect(message).toBeTruthy()
    }) 
})