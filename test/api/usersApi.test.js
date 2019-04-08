
var app = require('../../server');
const client = require('supertest')(app);
var server = null;
describe('users api test', () => {
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
    
    describe('GET /', () => {
        it('should return all genres', async () => {
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlclBob25lTnVtYmVyIjoiKzYyNzc3Nzc3Nzc3Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NTQ2MzQ0Mjl9.kXvea7oPo3bOFP_qRTYzi8uZhOm_0wiN3NAqirbrshM"
            let result = await client
                .get('/api/v1/users/authenticationStatus')
                .set({ 'X-Auth-Token': token })
            
            console.log("result body: ", result.body)
            expect(result.status).toBe(200)
        })
    })

    describe('GET /', () => {
        it('should return all genres', async () => {
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlclBob25lTnVtYmVyIjoiKzYyNzc3Nzc3Nzc3Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NTQ2MzQ0Mjl9.kXvea7oPo3bOFP_qRTYzi8uZhOm_0wiN3NAqirbrshM"
            let result = await client
                .get('/api/v1/users/authenticationStatus')
                .set({ 'X-Auth-Token': token })
            
            console.log("result body: ", result.body)
            expect(result.status).toBe(200)
        })
    })

})