const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Customer API', () => {
    let createdCustomerId;

    it('POST /api/customers - ควรสร้างลูกค้าสำเร็จ', async () => {
        const res = await request(app).post('/api/customers').send({
            name: "Test Robot",
            email: `robot_${Date.now()}@test.com`,
            password: "123",
            phone: "0999999999"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Test Robot");
        
        createdCustomerId = res.body._id;
    });

    it('GET /api/customers - ควรดึงข้อมูลได้และเป็น Array', async () => {
        const res = await request(app).get('/api/customers');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('DELETE /api/customers/:id - ควรลบข้อมูลได้', async () => {
        const res = await request(app).delete(`/api/customers/${createdCustomerId}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toContain('removed');
    });
});
