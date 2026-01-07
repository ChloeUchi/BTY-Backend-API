const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  discount_rate: { type: Number, default: 0 }, // % ที่ลด
  discount_amount: { type: Number, default: 0 }, // จำนวนเงินที่ลด
  final_price: { type: Number, required: true }, // ยอดที่ตัดจริง
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);