const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Customer = require('../models/Customer');

// 1.3 Buy Product
const buyProduct = asyncHandler(async (req, res) => {
  const { customer_id, product_name, product_price } = req.body;


    if (!customer_id || !product_name || !product_price) {
    res.status(400);
    throw new Error('กรุณาระบุข้อมูลให้ครบถ้วน');
  }

  if (product_price <= 0) {
    res.status(400);
    throw new Error('ราคาสินค้าต้องมากกว่า 0');
  }

  const customer = await Customer.findById(customer_id);
  if (!customer) { 
    res.status(404); 
    throw new Error('Customer not found'); 
  }

  // คำนวณส่วนลด
  let discountRate = customer.rate_discount || 0;
  let discountAmount = (product_price * discountRate) / 100;
  let finalPrice = product_price - discountAmount;

  // ตรวจสอบเงินในกระเป๋า
  if (customer.wallet < finalPrice) {
    res.status(400); throw new Error(`Insufficient balance. Need ${finalPrice}, Have ${customer.wallet}`);
  }

  // หักเงินลูกค้า
  customer.wallet -= finalPrice;
  await customer.save();

  // สร้าง Order
  const order = await Order.create({
    customer_id,
    product_name,
    product_price,
    discount_rate: discountRate,
    discount_amount: discountAmount,
    final_price: finalPrice
  });

  res.status(201).json({
    message: 'Purchase successful',
    order,
    remaining_wallet: customer.wallet
  });
});

// 1.4 Get All Orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('customer_id', 'name email');
  res.json(orders);
});

// 1.5 Get Customer Orders
const getCustomerOrders = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const orders = await Order.find({ customer_id: id });
  res.json(orders);
});

module.exports = { buyProduct, getAllOrders, getCustomerOrders };