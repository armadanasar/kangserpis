
var app = require('../../server');
const client = require('supertest')(app);
var server = null;
describe('orders api test', () => {
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
    

    it('should make new order', async (done) => {
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
            sellerPhoneNumber: '085612345678a'
        }
        client
            .post('/api/v1/sellers/create')
            .send(sellerDetails)
            .end((err, resSeller) => {
                let userDetails = {
                    userName: "Miho Kaneko",
                    userEmail: "miho@jjj7j.id",
                    /**
                     * This is done because no way to use async setter function in a sequelize model.
                     * I know this is a clunky experience
                     * Just live with it until they fixed it or I found another way to hack it round.
                     */
                    userPassword: "AIZAfefra",
                    userBirthday: Date.now(),
                    userGender: 'female',
                    userAddress: 'sultan agung',
                    userPhoneNumber: '085612345678'
                }
                client
                    .post('api/v1/users/create')
                    .send(userDetails)
                    .end((err, resUser) => {
                        console.log(resUser.body)
                        let orderDetail = {
                            userId: resUser.body.id,
                            sellerId: resSeller.body.id,
                            orderItem: "resolder ram chips on my acer swift!",
                            orderPrice: 300.0
                        }

                        client
                            .post('')


                        client
                            .post('api/v1/orders/create')
                            .send(orderDetail)
                            .end((err, resOrder) => {
                                
                                expect(res.status).toBe(200)
                                expect(res.body.userId).toBe(resUser.id)
                                expect(res.body.sellerId).toBe(resSeller.id)
                                expect(res.body.orderItem).toBe(orderDetail.orderItem)
                                expect(res.body.orderPrice).toBe(orderDetail.orderPrice)
                                
                                done()
                            })
                    })
            })    
        
    })

    // it('should refuse to make new seller on invalid input', async (done) => {
    //     let sellerDetails = {
    //         sellerName: "Miho Kaneko",
    //         sellerEmail: "miho@jjj7j.id",
    //         /**
    //          * This is done because no way to use async setter function in a sequelize model.
    //          * I know this is a clunky experience
    //          * Just live with it until they fixed it or I found another way to hack it round.
    //          */
    //         // sellerPassword: "AIZA",
    //         sellerBirthday: Date.now(),
    //         sellerGender: 'fefefrr',
    //         sellerAddress: 'sultan agung',
    //         sellerPhoneNumber: '085612345678'
    //     }
    //     client
    //         .post('/api/v1/sellers/create')
    //         .send(sellerDetails)
    //         .end((err, res) => {
    //             console.log("result body: ", res.body)
    //             expect(res.status).toBe(400)       
    //             done() 
    //         })    
        
    // })
    // it('should refuse to make new seller given same email or phone number', async (done) => {
    //     let sellerDetails = {
    //         sellerName: "Miho Kaneko",
    //         sellerEmail: "miho@jjj7j.id",
    //         /**
    //          * This is done because no way to use async setter function in a sequelize model.
    //          * I know this is a clunky experience
    //          * Just live with it until they fixed it or I found another way to hack it round.
    //          */
    //         sellerPassword: "AIZAfefra",
    //         sellerBirthday: Date.now(),
    //         sellerGender: 'female',
    //         sellerAddress: 'sultan agung',
    //         sellerPhoneNumber: '085612345678'
    //     }
    //     client
    //         .post('/api/v1/sellers/create')
    //         .send(sellerDetails)
    //         .end((err, res) => {
    //             console.log("result body: ", res.body)
    //             expect(res.status).toBe(200)       
         
         
    //             let dupsellerEmail = {
    //                 sellerName: "Miho Kaneko",
    //                 sellerEmail: "miho@jjj7j.id",
    //                 /**
    //                  * This is done because no way to use async setter function in a sequelize model.
    //                  * I know this is a clunky experience
    //                  * Just live with it until they fixed it or I found another way to hack it round.
    //                  */
    //                 sellerPassword: "AIZAfefra",
    //                 sellerBirthday: Date.now(),
    //                 sellerGender: 'female',
    //                 sellerAddress: 'sultan agung',
    //                 sellerPhoneNumber: '085612345123'
    //             }

    //             client
    //                 .post('/api/v1/sellers/create')
    //                 .send(dupsellerEmail)
    //                 .end((err, res) => {
    //                     expect(res.status).toBe(400)
    //                     expect(JSON.stringify(res.body)).toMatch(/exists/)
                    
    //                     let dupsellerPhone = {
    //                         sellerName: "Miho Kaneko",
    //                         sellerEmail: "miho@fakeemail.id",
    //                         /**
    //                          * This is done because no way to use async setter function in a sequelize model.
    //                          * I know this is a clunky experience
    //                          * Just live with it until they fixed it or I found another way to hack it round.
    //                          */
    //                         sellerPassword: "AIZAfefra",
    //                         sellerBirthday: Date.now(),
    //                         sellerGender: 'female',
    //                         sellerAddress: 'sultan agung',
    //                         sellerPhoneNumber: '085612345678'
    //                     }

    //                     client
    //                         .post('/api/v1/sellers/create')
    //                         .send(dupsellerPhone)
    //                         .end((err, res) => {
    //                             expect(res.status).toBe(400)
    //                             expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/exists/))
                                
    //                             let uniqueseller = {
    //                                 sellerName: "Miho Kaneko",
    //                                 sellerEmail: "miho@gmail.id",
    //                                 /**
    //                                  * This is done because no way to use async setter function in a sequelize model.
    //                                  * I know this is a clunky experience
    //                                  * Just live with it until they fixed it or I found another way to hack it round.
    //                                  */
    //                                 sellerPassword: "AIZAfefra",
    //                                 sellerBirthday: Date.now(),
    //                                 sellerGender: 'female',
    //                                 sellerAddress: 'sultan agung',
    //                                 sellerPhoneNumber: '08569876543'
    //                             }

    //                             client
    //                                 .post('/api/v1/sellers/create')
    //                                 .send(uniqueseller)
    //                                 .end((err, res) => {
    //                                     expect(res.status).toBe(200) 
    //                                     done()  
    //                                 })
    //                         })
    //                 })
    //         })    
    // })

    // it('should authenticate', async (done) => {
    //     // let sellerDetails = {
    //     //     sellerName: "Miho Kaneko",
    //     //     sellerEmail: "miho@jjjj.id",
    //     //     /**
    //     //      * This is done because no way to use async setter function in a sequelize model.
    //     //      * I know this is a clunky experience
    //     //      * Just live with it until they fixed it or I found another way to hack it round.
    //     //      */
    //     //     sellerPassword: "AIZAfefra",
    //     //     sellerBirthday: Date.now(),
    //     //     sellerGender: 'female',
    //     //     sellerAddress: 'sultan agung',
    //     //     sellerPhoneNumber: '0856123456'
    //     // }
    //     // client
    //     //     .post('/api/v1/sellers/create')
    //     //     .send(sellerDetails)
    //     //     .end((err, res) => {
    //     //         console.log("result body: ", res.body)     
    //             client
    //                 .post('/api/v1/sellers/authenticate')
    //                 .send({
    //                     phoneNumber: "085612345678",
    //                     password: "AIZAfefra"
    //                 })
    //                 .end((err, res) => {
    //                     console.log("result body: ", res.body)
    //                     expect(res.status).toBe(200)       
    //                     done() 
    //                 }) 
    //         // })   
    // })
    // // })

})