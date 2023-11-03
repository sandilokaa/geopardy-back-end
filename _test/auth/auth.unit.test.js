const request = require("supertest");
const server = require("../../server");

// --------------- Unit Endpoint Auth Test --------------- //

describe("Test the auth path", () => {

    describe("Register", () => {

        test("It should register a user with valid data", async() => {
        
            const userData = {
                name: "Maza",
                email: "maza@gmail.com",
                password: "maza1234",
                phoneNumber: "08123456789"
            };
    
            const response = await request(server).post("/api/v1/auth/register").send(userData);
            
            expect(response.status).toBe(201);
    
        });

    });

    describe("Login", () => {

        test("It should login a user with valid data", async() => {
        
            const userData = {
                email: "maza@gmail.com",
                password: "maza1234"
            };
    
            const response = await request(server).post("/api/v1/auth/login").send(userData);
            
            expect(response.status).toBe(201);
    
        });

    });

});

// --------------- End Endpoint Unit Auth Test --------------- //