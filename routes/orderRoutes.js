const express = require('express');
const router = express.Router();
const { buyProduct, getAllOrders, getCustomerOrders } = require('../controllers/orderController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customer_id
 *         - product_name
 *         - product_price
 *         - final_price
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         customer_id:
 *           type: string
 *           description: ID ของลูกค้า (ref to Customer)
 *         product_name:
 *           type: string
 *           description: ชื่อสินค้า
 *         product_price:
 *           type: number
 *           description: ราคาสินค้าเต็ม
 *         discount_rate:
 *           type: number
 *           default: 0
 *           description: เปอร์เซ็นต์ส่วนลด (%)
 *         discount_amount:
 *           type: number
 *           default: 0
 *           description: จำนวนเงินที่ลด (บาท)
 *         final_price:
 *           type: number
 *           description: ราคาสุทธิหลังหักส่วนลด
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API สำหรับจัดการคำสั่งซื้อ
 */

/**
 * @swagger
 * /api/orders/buy:
 *   post:
 *     summary: ซื้อสินค้า (หักเงินจาก wallet และบันทึกคำสั่งซื้อ)
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - product_name
 *               - product_price
 *             properties:
 *               customer_id:
 *                 type: string
 *                 description: MongoDB ID ของลูกค้า
 *               product_name:
 *                 type: string
 *                 description: ชื่อสินค้า
 *               product_price:
 *                 type: number
 *                 description: ราคาสินค้า
 *             example:
 *               customer_id: "507f1f77bcf86cd799439011"
 *               product_name: "iPhone 15 Pro"
 *               product_price: 45000
 *     responses:
 *       201:
 *         description: ซื้อสินค้าสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: เงินในกระเป๋าไม่พอหรือข้อมูลไม่ครบถ้วน
 *       404:
 *         description: ไม่พบลูกค้า
 *       500:
 *         description: Server error
 */
router.post('/buy', buyProduct);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: ดึงรายการคำสั่งซื้อทั้งหมด
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get('/', getAllOrders);

/**
 * @swagger
 * /api/orders/history:
 *   post:
 *     summary: ดึงประวัติคำสั่งซื้อของลูกค้าคนใดคนหนึ่ง
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: MongoDB ID ของลูกค้า
 *             example:
 *               id: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: ไม่ได้ส่ง ID มา
 *       500:
 *         description: Server error
 */
router.post('/history', getCustomerOrders);

module.exports = router;