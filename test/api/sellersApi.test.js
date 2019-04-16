
var app = require('../../server');
const client = require('supertest')(app);
var server = null;
describe('sellers api test', () => {
    beforeEach((done) => {

        // server = require('../../server');
        require('../../startup/db')(function () {
            server = app.listen(3000, () => {
                done()
            })
        })
        // console.log(server)
    })
    
    afterEach(() => {
        server.close();
    })
    
    // describe('GET /', () => {
    it('should parse jwt correctly', async () => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic2VsbGVyUGhvbmVOdW1iZXIiOiIwODU2MTIzNDU2NzgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNTU0ODc2Mjg2fQ.IGn0cdDeZoGoIAa5S_dsBtyIy_xzUm2rp1P_PeSh17E"
        let result = await client
            .get('/api/v1/sellers/authenticationStatus')
            .set({ 'X-Auth-Token': token })
        
        console.log("result body: ", result.body)
        expect(result.status).toBe(200)
    })


    it('should make new seller', async (done) => {
        let sellerDetails = {
            sellerName: "Miho Kaneko",
            sellerEmail: "miho@jjj7j.id",
            /**
             * This is done because no way to use async setter function in a sequelize model.
             * I know this is a clunky experience
             * Just live with it until they fixed it or I found another way to hack it round.
             */
            sellerPassword: "AIZAfefra",
            sellerBirthday: Date.now(),
            sellerGender: 'female',
            sellerAddress: 'sultan agung',
            sellerPhoneNumber: '085612345678'
        }
        client
            .post('/api/v1/sellers/create')
            .send(sellerDetails)
            .end((err, res) => {
                console.log("result body: ", res.body)
                expect(res.status).toBe(200)       
                done() 
            })    
        
    })

    it('should refuse to make new seller on invalid input', async (done) => {
        let sellerDetails = {
            sellerName: "Miho Kaneko",
            sellerEmail: "miho@jjj7j.id",
            /**
             * This is done because no way to use async setter function in a sequelize model.
             * I know this is a clunky experience
             * Just live with it until they fixed it or I found another way to hack it round.
             */
            // sellerPassword: "AIZA",
            sellerBirthday: Date.now(),
            sellerGender: 'fefefrr',
            sellerAddress: 'sultan agung',
            sellerPhoneNumber: '085612345678'
        }
        client
            .post('/api/v1/sellers/create')
            .send(sellerDetails)
            .end((err, res) => {
                console.log("result body: ", res.body)
                expect(res.status).toBe(400)       
                done() 
            })    
        
    })
    it('should refuse to make new seller given same email or phone number', async (done) => {
        let sellerDetails = {
            sellerName: "Miho Kaneko",
            sellerEmail: "miho@jjj7j.id",
            /**
             * This is done because no way to use async setter function in a sequelize model.
             * I know this is a clunky experience
             * Just live with it until they fixed it or I found another way to hack it round.
             */
            sellerPassword: "AIZAfefra",
            sellerBirthday: Date.now(),
            sellerGender: 'female',
            sellerAddress: 'sultan agung',
            sellerPhoneNumber: '085612345678'
        }
        client
            .post('/api/v1/sellers/create')
            .send(sellerDetails)
            .end((err, res) => {
                console.log("result body: ", res.body)
                expect(res.status).toBe(200)       
         
         
                let dupsellerEmail = {
                    sellerName: "Miho Kaneko",
                    sellerEmail: "miho@jjj7j.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    sellerPassword: "AIZAfefra",
                    sellerBirthday: Date.now(),
                    sellerGender: 'female',
                    sellerAddress: 'sultan agung',
                    sellerPhoneNumber: '085612345123'
                }

                client
                    .post('/api/v1/sellers/create')
                    .send(dupsellerEmail)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(JSON.stringify(res.body)).toMatch(/exists/)
                    
                        let dupsellerPhone = {
                            sellerName: "Miho Kaneko",
                            sellerEmail: "miho@fakeemail.id",
                            /**
                             * This is done because no way to use async setter function in a sequelize model.
                             * I know this is a clunky experience
                             * Just live with it until they fixed it or I found another way to hack it round.
                             */
                            sellerPassword: "AIZAfefra",
                            sellerBirthday: Date.now(),
                            sellerGender: 'female',
                            sellerAddress: 'sultan agung',
                            sellerPhoneNumber: '085612345678'
                        }

                        client
                            .post('/api/v1/sellers/create')
                            .send(dupsellerPhone)
                            .end((err, res) => {
                                expect(res.status).toBe(400)
                                expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/exists/))
                                
                                let uniqueseller = {
                                    sellerName: "Miho Kaneko",
                                    sellerEmail: "miho@gmail.id",
                                    /**
                                     * This is done because no way to use async setter function in a sequelize model.
                                     * I know this is a clunky experience
                                     * Just live with it until they fixed it or I found another way to hack it round.
                                     */
                                    sellerPassword: "AIZAfefra",
                                    sellerBirthday: Date.now(),
                                    sellerGender: 'female',
                                    sellerAddress: 'sultan agung',
                                    sellerPhoneNumber: '08569876543'
                                }

                                client
                                    .post('/api/v1/sellers/create')
                                    .send(uniqueseller)
                                    .end((err, res) => {
                                        expect(res.status).toBe(200) 
                                        done()  
                                    })
                            })
                    })
            })    
    })

    it('should authenticate', async (done) => {
        // let sellerDetails = {
        //     sellerName: "Miho Kaneko",
        //     sellerEmail: "miho@jjjj.id",
        //     /**
        //      * This is done because no way to use async setter function in a sequelize model.
        //      * I know this is a clunky experience
        //      * Just live with it until they fixed it or I found another way to hack it round.
        //      */
        //     sellerPassword: "AIZAfefra",
        //     sellerBirthday: Date.now(),
        //     sellerGender: 'female',
        //     sellerAddress: 'sultan agung',
        //     sellerPhoneNumber: '0856123456'
        // }
        // client
        //     .post('/api/v1/sellers/create')
        //     .send(sellerDetails)
        //     .end((err, res) => {
        //         console.log("result body: ", res.body)     
                client
                    .post('/api/v1/sellers/authenticate')
                    .send({
                        phoneNumber: "085612345678",
                        password: "AIZAfefra"
                    })
                    .end((err, res) => {
                        console.log("result body: ", res.body)
                        expect(res.status).toBe(200)       
                        done() 
                    }) 
            // })   
    })
    // })

})