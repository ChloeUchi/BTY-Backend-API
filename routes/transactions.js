const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  getTransactionsByCustomer,
  getTransactionsByOrder,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

// Routes
router.get('/customer/:customerId', getTransactionsByCustomer);
router.get('/order/:orderId', getTransactionsByOrder);
router.get('/:id', getTransactionById);
router.get('/', getAllTransactions);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
