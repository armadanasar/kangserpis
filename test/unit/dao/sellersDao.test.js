const sellersDao = require('../../../dao/sellersDao');
const boilerplate = require('../../boilerplate')
const jwt = require('jsonwebtoken')
const config = require('config');


describe('sellersDao test', () => {
    beforeEach(boilerplate.dbTestInit)
    it('should create a new seller', async() => {
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

            let result = await sellersDao.createNewSeller(sellerDetails)
        
            expect(result.sellerName).toBe("alief")
            expect(result.sellerEmail).toBe("alief@gmail.com")
            expect(result.sellerHashedPassword).toEqual(expect.not.stringContaining("alief123"))
        } catch (err) {
            throw err;
        }
    })


    
    it('should log the seller in by creating new token', async() => {
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

            let result = await sellersDao.createNewSeller(sellerDetails)
        
            expect(result.sellerName).toBe("alief")
            expect(result.sellerEmail).toBe("alief@gmail.com")
            expect(result.sellerHashedPassword).toEqual(expect.not.stringContaining("alief123"))
        
            let loginResult = await sellersDao.authenticateSeller("+62777777777", "alief123")

            expect(loginResult).toBeTruthy()
            expect(loginResult.length).toBeGreaterThan(0)
        
            
            let decodedLoginResult = jwt.verify(loginResult, config.get('jwtPrivateKey'));
            expect(Object.keys(decodedLoginResult).sort()).toEqual(expect.arrayContaining(['id', 'sellerPhoneNumber', 'role'].sort()))
            expect(decodedLoginResult.role).toContain("seller")
        } catch (err) {
            throw err;
        }
    })

    it('should not log the seller in given wrong password by returning false', async() => {
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

            let result = await sellersDao.createNewSeller(sellerDetails)
        
            expect(result.sellerName).toBe("alief")
            expect(result.sellerEmail).toBe("alief@gmail.com")
            expect(result.sellerHashedPassword).toEqual(expect.not.stringContaining("alief123"))
        
            let loginResult = await sellersDao.authenticateSeller("+62777777777", "wrongpassword")

            expect(loginResult).toBe(false)
            // expect(loginResult.length).toBeGreaterThan(0)
        } catch (err) {
            throw err;
        }
    })
})