const supertest = require('supertest');
const app = require('../app');

const {
    loadPlanetsData,
} = require('../models/planets.model');

describe('Launches API', () => {
    async () => {
        await loadPlanetsData();
    };
})

//Payload for test launch
const launchPayload = {
    mission: "Kepler Exploration 1",
    rocket: "ESX 123",
    target: "Kepler-441",
    launchDate: "January 2, 2024"
}
const launchPayloadInvalidDate = {
    mission: "Kepler Exploration 1",
    rocket: "ESX 123",
    target: "Kepler-441",
    launchDate: "Jasdasdasd"
}

//Test GET request for endpoint /launches
describe('GET /launches', () => {
    describe('Get all launches', () => {
        test("Should response with a 200 status code", async () => {
            await supertest(app).get("/launches").expect(200).expect('Content-Type', /json/)
        })
    })
})

//Test POST request for endpoint /launches
describe('POST /launches', () => {
    describe('Create launch', () => {
        test("Should response with a 201 status code", async () => {
            let newFlightNumber = 100;
            await supertest(app).post("/launches").send(launchPayload).expect(201,
            {
                mission: "Kepler Exploration 1",
                rocket: "ESX 123",
                target: "Kepler-441",
                launchDate: "2024-01-01T17:00:00.000Z",
                success: true,
                upcoming: true,
                customer: [ 
                    'Zero To Mastery',
                    'NASA',
                ],
                flightNumber: newFlightNumber + 1
            })
        })

        describe('Create launch with missing argument', () => {
            test("Should response with a 400 status code", async () => {
                await supertest(app).post("/launches").expect(400).expect('Content-Type', /json/)
            })
        })

        describe("Create launch with invalid dates", () => {
            test("Should response with a 400 status code", async () => {
                await supertest(app).post("/launches").send(launchPayloadInvalidDate).expect(400).expect('Content-Type', /json/)
            })
        })
    })
})

//Test DELETE request for endpoint /launches
describe("DELETE /launches/:id", () => {
    describe("Delete launch by id", () => {
        test("Should response with a 200 status code", async () => {
            const launchId = 100;
            await supertest(app).delete(`/launches/${launchId}`).expect(200)
        })
    })
})

