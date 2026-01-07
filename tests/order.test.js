const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // await Order.deleteMany({ product_name: /Test Product/ });
  // await Customer.deleteMany({ email: /test_order/ });
  await mongoose.connection.close();
});

describe("Order API & Logic", () => {
  let customerId;
  let initialWallet = 1000;
  let discountRate = 10; // ลด 10%

  it("Setup Customer: สร้างลูกค้าพร้อมส่วนลด 10% และเงิน 1000", async () => {
    const res = await request(app)
      .post("/api/customers")
      .send({
        name: "Rich Shopper",
        email: `shopper_${Date.now()}@test.com`,
        password: "123",
        phone: "0888888888",
        rate_discount: discountRate,
      });
    expect(res.statusCode).toBe(201);
    customerId = res.body._id;

    await Customer.findByIdAndUpdate(customerId, { wallet: initialWallet });
  });

  it("POST /api/orders/buy - ซื้อสินค้าและคำนวณส่วนลดถูกต้อง", async () => {
    const productPrice = 500;
    const expectedFinalPrice = 450;
    const expectedRemainingWallet = initialWallet - expectedFinalPrice; // 1000 - 450 = 550

    const res = await request(app).post("/api/orders/buy").send({
      customer_id: customerId,
      product_name: "Test Product Gaming Mouse",
      product_price: productPrice,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.order.final_price).toBe(expectedFinalPrice); // เช็คราคาหลังลด
    expect(res.body.remaining_wallet).toBe(expectedRemainingWallet); // เช็คเงินคงเหลือ
  });

  // 3. ทดสอบกรณีเงินไม่พอ
  it("POST /api/orders/buy - ควร Error ถ้าเงินไม่พอ", async () => {
    const res = await request(app).post("/api/orders/buy").send({
      customer_id: customerId,
      product_name: "Expensive Car",
      product_price: 100000,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Insufficient/i);
  });

  it("GET /api/orders - ควรเห็นรายการสั่งซื้อ", async () => {
    const res = await request(app).get("/api/orders");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
