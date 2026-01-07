const asyncHandler = require('express-async-handler');
const Customer = require('../models/Customer');

// 1.1 Create Customer
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, password, phone, rate_discount } = req.body;
  
  if (!name || !email || !password || !phone) {
    res.status(400); throw new Error('Please add all fields');
  }

  const customerExists = await Customer.findOne({ email });
  if (customerExists) {
    res.status(400); throw new Error('User already exists');
  }

  const customer = await Customer.create({
    name, email, password, phone, rate_discount
  });

  if (customer) {
    res.status(201).json({
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      wallet: customer.wallet
    });
  } else {
    res.status(400); throw new Error('Invalid user data');
  }
});

// 1.1 Read Customers
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find().select('-password');
  res.json(customers);
});

// 1.1 Update Customer
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) { res.status(404); throw new Error('Customer not found'); }

  const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  res.json(updatedCustomer);
});

// 1.1 Delete Customer
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) { res.status(404); throw new Error('Customer not found'); }
  
  await customer.deleteOne();
  res.json({ id: req.params.id, message: 'Customer removed' });
});

// 1.2 Top-up Wallet
const topupWallet = asyncHandler(async (req, res) => {
  const { id, wallet_topup } = req.body;

  if (!id || !wallet_topup || wallet_topup <= 0) {
    res.status(400); throw new Error('Invalid input');
  }

  const customer = await Customer.findByIdAndUpdate(
    id,
    { $inc: { wallet: wallet_topup } },
    { new: true }
  ).select('-password');

  if(!customer) { res.status(404); throw new Error('Customer not found'); }

  res.json({ message: 'Top-up successful', current_wallet: customer.wallet });
});

module.exports = { createCustomer, getCustomers, updateCustomer, deleteCustomer, topupWallet };