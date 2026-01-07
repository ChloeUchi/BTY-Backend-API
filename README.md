# BTY-Backend-API

API Documentation for Customer, Order, and Transaction System

## Overview

This is a RESTful API built with Node.js, Express.js, and MongoDB for managing customers, orders, and transactions in a business system.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ChloeUchi/BTY-Backend-API.git
cd BTY-Backend-API
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` and update with your MongoDB connection string.

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`.

## Features

✅ Customer Management (CRUD operations)
✅ Order Management (CRUD operations)
✅ Transaction Management (CRUD operations)
✅ MongoDB database integration
✅ RESTful API design
✅ Error handling
✅ Data validation
✅ Cross-Origin Resource Sharing (CORS)

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/customer/:customerId` - Get orders by customer
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `GET /api/transactions/customer/:customerId` - Get transactions by customer
- `GET /api/transactions/order/:orderId` - Get transactions by order
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Documentation

For detailed API documentation, examples, and data models, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Project Structure

```
BTY-Backend-API/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── customerController.js
│   ├── orderController.js
│   └── transactionController.js
├── models/
│   ├── Customer.js
│   ├── Order.js
│   └── Transaction.js
├── routes/
│   ├── customers.js
│   ├── orders.js
│   └── transactions.js
├── .env.example             # Environment variables template
├── .gitignore
├── API_DOCUMENTATION.md     # Detailed API documentation
├── package.json
├── README.md
└── server.js                # Main application entry point
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parsing

## License

ISC
