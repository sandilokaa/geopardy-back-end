const request = require("supertest");
const server = require("../../server");

describe("Create Risk Level", () => {

    test("It should create risk level with valid data with a valid Bearer Token", async() => {
    
        const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW5sb2thamFAZ21haWwuY29tIiwiaWF0IjoxNzAwMTYyMzMwLCJleHAiOjE3MDAxOTExMzB9._S_94dUyFp0E5waYqkVE6gPARQOEsH6Ihvp3iaMan70';
        const riskLevelData = {
            adminId: 1,
            riskLevel: 'Sedang',
            description: 'Daerah atau komunitas dengan risiko bencana yang sedang. Mungkin memiliki beberapa faktor risiko dan kekurangan dalam infrastruktur atau kesiapsiagaan masyarakat.'
        };

        const response = await request(server)
            .post('/api/v1/risk-level')
            .set('Authorization', `Bearer ${validToken}`)
            .send(riskLevelData);

        expect(response.status).toBe(201);

    });

});