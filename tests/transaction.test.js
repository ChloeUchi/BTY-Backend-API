const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Transaction = require('../models/Transaction');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    // await Transaction.deleteMany({ title: /Test/ });
    await mongoose.connection.close();
});

describe('Transaction & Dashboard API', () => {

    it('POST /api/transactions (Income) - บันทึกรายรับ', async () => {
        const res = await request(app).post('/api/transactions').send({
            title: "Test Income Salary",
            type: "income",
            amount: 5000,
            date: new Date()
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.type).toBe('income');
    });

    it('POST /api/transactions (Expense) - บันทึกรายจ่าย', async () => {
        const res = await request(app).post('/api/transactions').send({
            title: "Test Expense Food",
            type: "expense",
            amount: 2000,
            date: new Date()
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.type).toBe('expense');
    });

    it('GET /api/transactions - ควรคำนวณ Balance ถูกต้อง', async () => {
        const res = await request(app).get('/api/transactions');
        
        expect(res.statusCode).toBe(200);
        
        expect(res.body).toHaveProperty('balance');
        expect(res.body).toHaveProperty('summary');
        expect(res.body.summary).toHaveProperty('income');
        expect(res.body.summary).toHaveProperty('expense');

        const { income, expense } = res.body.summary;
        expect(res.body.balance).toBe(income - expense);
    });

    it('GET /api/transactions/dashboard - ควรส่งข้อมูลกราฟและสถิติ', async () => {
        const res = await request(app).get('/api/transactions/dashboard');

        expect(res.statusCode).toBe(200);
        
        expect(res.body).toHaveProperty('year');
        expect(res.body).toHaveProperty('totals');
        expect(res.body).toHaveProperty('growth_rate');
        expect(res.body).toHaveProperty('monthly_graph');
        
        expect(Array.isArray(res.body.monthly_graph)).toBe(true);
    });
});