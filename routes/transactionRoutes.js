const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, getDashboard } = require('../controllers/transactionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - amount
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           description: หัวข้อรายการ
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: ประเภท (income=รายรับ, expense=รายจ่าย)
 *         amount:
 *           type: number
 *           description: จำนวนเงิน
 *         date:
 *           type: string
 *           format: date-time
 *           description: วันที่ทำรายการ
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Dashboard:
 *       type: object
 *       properties:
 *         totalIncome:
 *           type: number
 *           description: รายรับรวม
 *         totalExpense:
 *           type: number
 *           description: รายจ่ายรวม
 *         balance:
 *           type: number
 *           description: ยอดคงเหลือ (รายรับ - รายจ่าย)
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API สำหรับจัดการรายรับ-รายจ่าย
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: เพิ่มรายการรับ-จ่ายใหม่
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - amount
 *             properties:
 *               title:
 *                 type: string
 *                 description: หัวข้อรายการ
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 description: ประเภท
 *               amount:
 *                 type: number
 *                 description: จำนวนเงิน
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: วันที่ (ถ้าไม่ใส่จะใช้วันที่ปัจจุบัน)
 *             example:
 *               title: "ขายสินค้า"
 *               type: "income"
 *               amount: 5000
 *     responses:
 *       201:
 *         description: เพิ่มรายการสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 *       500:
 *         description: Server error
 *   get:
 *     summary: ดึงรายการรับ-จ่ายทั้งหมด
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Server error
 */
router.route('/').post(addTransaction).get(getTransactions);

/**
 * @swagger
 * /api/transactions/dashboard:
 *   get:
 *     summary: ดึงสรุปข้อมูลรายรับ-รายจ่าย (Dashboard)
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *             example:
 *               totalIncome: 50000
 *               totalExpense: 30000
 *               balance: 20000
 *       500:
 *         description: Server error
 */
router.get('/dashboard', getDashboard);

module.exports = router;