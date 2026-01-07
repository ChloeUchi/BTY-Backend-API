const express = require('express');
const router = express.Router();
const { createCustomer, getCustomers, updateCustomer, deleteCustomer, topupWallet } = require('../controllers/customerController');

// ---------------------------------------------------------
// 1. Define Schema (นิยามโครงสร้างข้อมูลครั้งเดียว ใช้ได้ตลอด)
// ---------------------------------------------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         name:
 *           type: string
 *           description: ชื่อลูกค้า
 *         email:
 *           type: string
 *           format: email
 *           description: อีเมล (ต้องไม่ซ้ำ)
 *         password:
 *           type: string
 *           format: password
 *           description: รหัสผ่าน (จะถูก hash อัตโนมัติ)
 *         phone:
 *           type: string
 *           description: เบอร์โทรศัพท์
 *         wallet:
 *           type: number
 *           default: 0
 *           description: ยอดเงินในกระเป๋า
 *         rate_discount:
 *           type: number
 *           nullable: true
 *           description: เปอร์เซ็นต์ส่วนลด (%)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// ---------------------------------------------------------
// 2. Define Routes (เขียนกำกับแต่ละ Endpoint)
// ---------------------------------------------------------

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API สำหรับจัดการลูกค้า
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: ดึงรายชื่อลูกค้าทั้งหมด
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Server error
 *   post:
 *     summary: สร้างลูกค้าใหม่
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "สมชาย ใจดี"
 *               email:
 *                 type: string
 *                 example: "somchai@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               phone:
 *                 type: string
 *                 example: "0812345678"
 *               rate_discount:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: สร้างลูกค้าสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: ข้อมูลไม่ครบถ้วนหรือ email ซ้ำ
 *       500:
 *         description: Server error
 */
router.route('/').get(getCustomers).post(createCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: แก้ไขข้อมูลลูกค้า
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ID ของลูกค้า
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               rate_discount:
 *                 type: number
 *           example:
 *             name: "สมชาย ใจดี (แก้ไข)"
 *             phone: "0898765432"
 *             rate_discount: 15
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: ไม่พบลูกค้า
 *       500:
 *         description: Server error
 *   delete:
 *     summary: ลบลูกค้า
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ID ของลูกค้า
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ลบลูกค้าสำเร็จ"
 *       404:
 *         description: ไม่พบลูกค้า
 *       500:
 *         description: Server error
 */
router.route('/:id').put(updateCustomer).delete(deleteCustomer);

/**
 * @swagger
 * /api/customers/topup:
 *   post:
 *     summary: เติมเงินเข้า Wallet
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - wallet_topup
 *             properties:
 *               id:
 *                 type: string
 *                 description: MongoDB ID ของลูกค้า
 *               wallet_topup:
 *                 type: number
 *                 description: จำนวนเงินที่ต้องการเติม
 *             example:
 *               id: "507f1f77bcf86cd799439011"
 *               wallet_topup: 1000
 *     responses:
 *       200:
 *         description: เติมเงินสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       404:
 *         description: ไม่พบลูกค้า
 *       500:
 *         description: Server error
 */
router.post('/topup', topupWallet);

module.exports = router;