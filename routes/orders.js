const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByCustomer,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

// Routes
router.get('/customer/:customerId', getOrdersByCustomer);
router.get('/:id', getOrderById);
router.get('/', getAllOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
