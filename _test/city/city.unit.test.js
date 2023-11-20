const request = require("supertest");
const server = require("../../server");

describe("Create City", () => {

    test("It should create city with valid data with a valid Bearer Token", async() => {
    
        const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW5sb2thamFAZ21haWwuY29tIiwiaWF0IjoxNzAwNDk4MzY5LCJleHAiOjE3MDA1MjcxNjl9.ySVUW-weK_-wb8XadoIIvlyqAfU95DvCpmlgOwLlNa4';
        const cityNameData = {
            adminId: 1,
            cityName: 'Albany'
        };

        const response = await request(server)
            .post('/api/v1/city')
            .set('Authorization', `Bearer ${validToken}`)
            .send(cityNameData);

        expect(response.status).toBe(201);

    });

});