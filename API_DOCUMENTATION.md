# BTY Backend API Documentation

API Documentation for Customer, Order, and Transaction System using Node.js and MongoDB.

## Table of Contents
- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Customers](#customers)
  - [Orders](#orders)
  - [Transactions](#transactions)
- [Data Models](#data-models)
- [Response Format](#response-format)
- [Error Handling](#error-handling)

## Overview

This is a RESTful API built with Node.js, Express.js, and MongoDB for managing customers, orders, and transactions in a business system.

## Technologies

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing
- **body-parser**: Request body parsing middleware

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ChloeUchi/BTY-Backend-API.git
cd BTY-Backend-API
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bty_database
NODE_ENV=development
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

---

### Customers

#### Get All Customers
- **URL**: `/customers`
- **Method**: `GET`
- **Description**: Retrieve all customers
- **Response**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Customer by ID
- **URL**: `/customers/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific customer by ID
- **URL Parameters**: `id` - Customer ID
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }
}
```

#### Create Customer
- **URL**: `/customers`
- **Method**: `POST`
- **Description**: Create a new customer
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Customer
- **URL**: `/customers/:id`
- **Method**: `PUT`
- **Description**: Update an existing customer
- **URL Parameters**: `id` - Customer ID
- **Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+0987654321"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+0987654321",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### Delete Customer
- **URL**: `/customers/:id`
- **Method**: `DELETE`
- **Description**: Delete a customer
- **URL Parameters**: `id` - Customer ID
- **Response**:
```json
{
  "success": true,
  "data": {}
}
```

---

### Orders

#### Get All Orders
- **URL**: `/orders`
- **Method**: `GET`
- **Description**: Retrieve all orders with customer information
- **Response**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "customerId": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
      },
      "orderNumber": "ORD-20240101-001",
      "items": [
        {
          "productName": "Product A",
          "quantity": 2,
          "price": 50.00,
          "subtotal": 100.00
        }
      ],
      "totalAmount": 100.00,
      "status": "pending",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Order by ID
- **URL**: `/orders/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific order by ID
- **URL Parameters**: `id` - Order ID
- **Response**: Similar to Get All Orders but returns a single order

#### Get Orders by Customer
- **URL**: `/orders/customer/:customerId`
- **Method**: `GET`
- **Description**: Retrieve all orders for a specific customer
- **URL Parameters**: `customerId` - Customer ID
- **Response**: Similar to Get All Orders

#### Create Order
- **URL**: `/orders`
- **Method**: `POST`
- **Description**: Create a new order
- **Request Body**:
```json
{
  "customerId": "507f1f77bcf86cd799439011",
  "orderNumber": "ORD-20240101-001",
  "items": [
    {
      "productName": "Product A",
      "quantity": 2,
      "price": 50.00,
      "subtotal": 100.00
    }
  ],
  "totalAmount": 100.00,
  "status": "pending",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```
- **Response**: Returns the created order with generated ID and timestamps

#### Update Order
- **URL**: `/orders/:id`
- **Method**: `PUT`
- **Description**: Update an existing order
- **URL Parameters**: `id` - Order ID
- **Request Body**:
```json
{
  "status": "completed"
}
```
- **Response**: Returns the updated order

#### Delete Order
- **URL**: `/orders/:id`
- **Method**: `DELETE`
- **Description**: Delete an order
- **URL Parameters**: `id` - Order ID
- **Response**:
```json
{
  "success": true,
  "data": {}
}
```

---

### Transactions

#### Get All Transactions
- **URL**: `/transactions`
- **Method**: `GET`
- **Description**: Retrieve all transactions with customer and order information
- **Response**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "customerId": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
      },
      "orderId": {
        "_id": "507f1f77bcf86cd799439012",
        "orderNumber": "ORD-20240101-001",
        "totalAmount": 100.00
      },
      "transactionNumber": "TXN-20240101-001",
      "amount": 100.00,
      "paymentMethod": "credit_card",
      "status": "completed",
      "transactionDate": "2024-01-01T00:00:00.000Z",
      "description": "Payment for order ORD-20240101-001",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Transaction by ID
- **URL**: `/transactions/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific transaction by ID
- **URL Parameters**: `id` - Transaction ID
- **Response**: Similar to Get All Transactions but returns a single transaction

#### Get Transactions by Customer
- **URL**: `/transactions/customer/:customerId`
- **Method**: `GET`
- **Description**: Retrieve all transactions for a specific customer
- **URL Parameters**: `customerId` - Customer ID
- **Response**: Similar to Get All Transactions

#### Get Transactions by Order
- **URL**: `/transactions/order/:orderId`
- **Method**: `GET`
- **Description**: Retrieve all transactions for a specific order
- **URL Parameters**: `orderId` - Order ID
- **Response**: Similar to Get All Transactions

#### Create Transaction
- **URL**: `/transactions`
- **Method**: `POST`
- **Description**: Create a new transaction
- **Request Body**:
```json
{
  "customerId": "507f1f77bcf86cd799439011",
  "orderId": "507f1f77bcf86cd799439012",
  "transactionNumber": "TXN-20240101-001",
  "amount": 100.00,
  "paymentMethod": "credit_card",
  "status": "completed",
  "description": "Payment for order ORD-20240101-001"
}
```
- **Response**: Returns the created transaction with generated ID and timestamps

#### Update Transaction
- **URL**: `/transactions/:id`
- **Method**: `PUT`
- **Description**: Update an existing transaction
- **URL Parameters**: `id` - Transaction ID
- **Request Body**:
```json
{
  "status": "refunded"
}
```
- **Response**: Returns the updated transaction

#### Delete Transaction
- **URL**: `/transactions/:id`
- **Method**: `DELETE`
- **Description**: Delete a transaction
- **URL Parameters**: `id` - Transaction ID
- **Response**:
```json
{
  "success": true,
  "data": {}
}
```

---

## Data Models

### Customer Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  customerId: ObjectId (ref: Customer, required),
  orderNumber: String (required, unique),
  items: [{
    productName: String (required),
    quantity: Number (required, min: 1),
    price: Number (required, min: 0),
    subtotal: Number (required)
  }],
  totalAmount: Number (required, min: 0),
  status: String (enum: ['pending', 'processing', 'completed', 'cancelled']),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model
```javascript
{
  customerId: ObjectId (ref: Customer, required),
  orderId: ObjectId (ref: Order, required),
  transactionNumber: String (required, unique),
  amount: Number (required, min: 0),
  paymentMethod: String (enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash']),
  status: String (enum: ['pending', 'completed', 'failed', 'refunded']),
  transactionDate: Date,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "count": 0  // Only for list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## License

ISC

## Author

BTY Backend API Team
