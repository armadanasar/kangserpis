const usersDao = require('../../../dao/usersDao');
const boilerplate = require('../../boilerplate')
const jwt = require('jsonwebtoken')
const config = require('config');

describe('usersDao test', () => {
    beforeEach(boilerplate.dbTestInit)
    it('should create a new user', async() => {
        try {
            let userDetails = {
                userName: "alief",
                userEmail: "alief@gmail.com",
                userPassword: "alief123",
                userBirthday: "1999-04-12",
                userGender: "male",
                userAddress: "deket binus",
                userPhoneNumber: "+62777777777"
            }

            let result = await usersDao.createNewUser(userDetails)
        
            expect(result.userName).toBe("alief")
            expect(result.userEmail).toBe("alief@gmail.com")
            expect(result.userHashedPassword).toEqual(expect.not.stringContaining("alief123"))
        } catch (err) {
            throw err;
        }
    })

    it('should log the user in by creating new token', async() => {
        try {
            let userDetails = {
                userName: "alief",
                userEmail: "alief@gmail.com",
                userPassword: "alief123",
                userBirthday: "1999-04-12",
                userGender: "male",
                userAddress: "deket binus",
                userPhoneNumber: "+62777777777"
            }

            let result = await usersDao.createNewUser(userDetails)
        
            expect(result.userName).toBe("alief")
            expect(result.userEmail).toBe("alief@gmail.com")
            expect(result.userHashedPassword).toEqual(expect.not.stringContaining("alief123"))
        
            let loginResult = await usersDao.authenticateUser("+62777777777", "alief123")
            console.log(loginResult)
            expect(loginResult).toBeTruthy()
            expect(loginResult.length).toBeGreaterThan(0)
        
        
            let decodedLoginResult = jwt.verify(loginResult, config.get('jwtPrivateKey'));
            // expect(Object.keys(decodedLoginResult).sort()).toEqual(['id', 'userPhoneNumber', 'role'].sort())
            expect(Object.keys(decodedLoginResult).sort()).toEqual(expect.arrayContaining(['id', 'userPhoneNumber', 'role'].sort()))
            
            expect(decodedLoginResult.role).toContain("user")
        } catch (err) {
            throw err;
        }
    })

    it('should not log the user in given wrong password by returning false', async() => {
        try {
            let userDetails = {
                userName: "alief",
                userEmail: "alief@gmail.com",
                userPassword: "alief123",
                userBirthday: "1999-04-12",
                userGender: "male",
                userAddress: "deket binus",
                userPhoneNumber: "+62777777777"
            }

            let result = await usersDao.createNewUser(userDetails)
        
            expect(result.userName).toBe("alief")
            expect(result.userEmail).toBe("alief@gmail.com")
            expect(result.userHashedPassword).toEqual(expect.not.stringContaining("alief123"))
        
            let loginResult = await usersDao.authenticateUser("+62777777777", "wrongpassword")

            expect(loginResult).toBe(false)
            // expect(loginResult.length).toBeGreaterThan(0)
        } catch (err) {
            throw err;
        }
    })
})