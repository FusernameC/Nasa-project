const supertest = require('supertest');
const app = require('../app');

//Test GET request for endpoint /planets
describe('GET /planets', () => {
    describe('Get all planets', () => {
        test("Should response with a 200 code", async () => {
            await supertest(app).get("/planets").expect(200)
        })
    })
})