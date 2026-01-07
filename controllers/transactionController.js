const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');

// 1.7 Add Transaction
const addTransaction = asyncHandler(async (req, res) => {
  const { title, type, amount, date } = req.body;
  
  if (!['income', 'expense'].includes(type)) {
    res.status(400); throw new Error('Type must be income or expense');
  }

  const transaction = await Transaction.create({
    title, type, amount, 
    date: date ? new Date(date) : undefined 
  });
  
  res.status(201).json(transaction);
});

// 1.8 Get Transactions (Filter & Balance)
const getTransactions = asyncHandler(async (req, res) => {
  const { type, startDate, endDate } = req.query;
  
  let query = {};
  if (type) query.type = type;
  if (startDate && endDate) {
    query.date = { 
      $gte: new Date(startDate), 
      $lte: new Date(new Date(endDate).setHours(23,59,59)) 
    };
  }

  const transactions = await Transaction.find(query).sort({ date: -1 });

  // คำนวณ Balance
  const totalIncome = transactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc, 0);
  const totalExpense = transactions.reduce((acc, curr) => curr.type === 'expense' ? acc + curr.amount : acc, 0);

  res.json({
    balance: totalIncome - totalExpense,
    summary: { income: totalIncome, expense: totalExpense },
    transactions
  });
});

// 1.9 Dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  // Helper สำหรับดึงยอดรวมรายปี
  const getYearlyTotal = async (year) => {
    const result = await Transaction.aggregate([
      { $match: { 
          date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } 
      }},
      { $group: { 
          _id: "$type", 
          total: { $sum: "$amount" } 
      }}
    ]);
    
    let income = 0, expense = 0;
    result.forEach(r => {
      if (r._id === 'income') income = r.total;
      if (r._id === 'expense') expense = r.total;
    });
    return { income, expense };
  };

  const thisYearStats = await getYearlyTotal(currentYear);
  const lastYearStats = await getYearlyTotal(lastYear);

  // คำนวณ Growth Rate
  const calcGrowth = (curr, prev) => prev === 0 ? 100 : ((curr - prev) / prev) * 100;
  
  // กราฟรายเดือน (Aggregation Pipeline)
  const monthlyGraph = await Transaction.aggregate([
    { $match: { 
        date: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31`) } 
    }},
    { $group: {
        _id: { month: { $month: "$date" } },
        income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
        expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } }
    }},
    { $sort: { "_id.month": 1 } },
    { $project: { month: "$_id.month", income: 1, expense: 1, _id: 0 } }
  ]);

  res.json({
    year: currentYear,
    totals: thisYearStats,
    growth_rate: {
      income_growth: calcGrowth(thisYearStats.income, lastYearStats.income).toFixed(2) + '%',
      expense_growth: calcGrowth(thisYearStats.expense, lastYearStats.expense).toFixed(2) + '%'
    },
    monthly_graph: monthlyGraph
  });
});

module.exports = { addTransaction, getTransactions, getDashboard };