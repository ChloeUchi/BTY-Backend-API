# API Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  (Web Browser, Mobile App, Postman, cURL, etc.)             │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Express.js Server                       │
│                         (server.js)                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Middleware Layer                        │   │
│  │  - CORS                                              │   │
│  │  - express.json()                                    │   │
│  │  - express.urlencoded()                              │   │
│  │  - Error Handling                                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Routes Layer                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  /customers  │  │   /orders    │  │/transactions │     │
│  │              │  │              │  │              │     │
│  │  GET  POST   │  │  GET  POST   │  │  GET  POST   │     │
│  │  PUT DELETE  │  │  PUT DELETE  │  │  PUT DELETE  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Controllers Layer                        │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────┐ │
│  │ customerController│  │ orderController │  │transaction│ │
│  │                  │  │                  │  │Controller │ │
│  │ - getAllCustomers│  │ - getAllOrders   │  │- getAll   │ │
│  │ - getById        │  │ - getById        │  │- getById  │ │
│  │ - create         │  │ - getByCustomer  │  │- create   │ │
│  │ - update         │  │ - create         │  │- update   │ │
│  │ - delete         │  │ - update         │  │- delete   │ │
│  │                  │  │ - delete         │  │           │ │
│  └──────────────────┘  └──────────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Models Layer                           │
│                     (Mongoose Schemas)                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Customer   │  │    Order     │  │ Transaction  │     │
│  │              │  │              │  │              │     │
│  │ - firstName  │  │ - customerId │  │ - customerId │     │
│  │ - lastName   │  │ - orderNumber│  │ - orderId    │     │
│  │ - email      │  │ - items[]    │  │ - txNumber   │     │
│  │ - phone      │  │ - totalAmt   │  │ - amount     │     │
│  │ - address    │  │ - status     │  │ - payMethod  │     │
│  │ - timestamps │  │ - timestamps │  │ - status     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ Mongoose ODM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Database                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  customers   │  │    orders    │  │ transactions │     │
│  │  Collection  │  │  Collection  │  │  Collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Example: Create a New Customer

```
1. Client sends POST request
   POST /api/customers
   Body: { firstName, lastName, email, phone, address }
   
2. Express server receives request
   ↓
3. Middleware processes request
   - CORS check
   - Parse JSON body
   ↓
4. Route handler matches path
   POST /api/customers → createCustomer
   ↓
5. Controller processes business logic
   - Validate data
   - Create customer document
   ↓
6. Model (Mongoose) interacts with database
   - Customer.create(data)
   ↓
7. MongoDB saves document
   ↓
8. Response flows back up
   - Model returns saved document
   - Controller formats response
   - Express sends JSON response
   ↓
9. Client receives response
   { success: true, data: { _id, firstName, ... } }
```

## Project Structure

```
BTY-Backend-API/
│
├── config/                  # Configuration files
│   └── database.js         # MongoDB connection setup
│
├── controllers/            # Business logic layer
│   ├── customerController.js
│   ├── orderController.js
│   └── transactionController.js
│
├── models/                 # Data models (Mongoose schemas)
│   ├── Customer.js
│   ├── Order.js
│   └── Transaction.js
│
├── routes/                 # API route definitions
│   ├── customers.js
│   ├── orders.js
│   └── transactions.js
│
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── API_DOCUMENTATION.md   # Detailed API documentation
├── ARCHITECTURE.md        # This file
├── EXAMPLES.md            # API usage examples
├── package.json           # Project dependencies
├── postman_collection.json # Postman collection for testing
├── README.md              # Project overview
├── SECURITY.md            # Security recommendations
└── server.js              # Application entry point
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Node.js | JavaScript runtime environment |
| Framework | Express.js | Web application framework |
| Database | MongoDB | NoSQL document database |
| ODM | Mongoose | MongoDB object modeling |
| Security | CORS | Cross-origin resource sharing |
| Config | dotenv | Environment variable management |

## API Endpoints Summary

### Customer Endpoints
- `GET /api/customers` - List all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Order Endpoints
- `GET /api/orders` - List all orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/customer/:customerId` - Get orders by customer
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Transaction Endpoints
- `GET /api/transactions` - List all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `GET /api/transactions/customer/:customerId` - Get transactions by customer
- `GET /api/transactions/order/:orderId` - Get transactions by order
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Data Relationships

```
Customer (1) ←──────── (N) Order
    │                      │
    │                      │
    ↓                      ↓
    └──────→ Transaction ←─┘
    
Customer:
  - Has many Orders
  - Has many Transactions

Order:
  - Belongs to one Customer
  - Has many Transactions (typically 1)

Transaction:
  - Belongs to one Customer
  - Belongs to one Order
```

## Scaling Considerations

### Horizontal Scaling
- Stateless API design allows multiple server instances
- Load balancer can distribute requests
- MongoDB supports replica sets and sharding

### Caching Strategy
- Implement Redis for frequently accessed data
- Cache customer profiles
- Cache order summaries

### Performance Optimization
- Database indexing on frequently queried fields
- Pagination for large data sets
- Query optimization with Mongoose lean()
- Connection pooling

## Deployment Architecture (Recommended)

```
┌─────────────────────────────────────┐
│         Load Balancer               │
│         (NGINX/AWS ALB)             │
└─────────────────────────────────────┘
              │
              ├──────────┬──────────┬──────────
              ▼          ▼          ▼
         ┌────────┐ ┌────────┐ ┌────────┐
         │ Node.js│ │ Node.js│ │ Node.js│
         │Instance│ │Instance│ │Instance│
         └────────┘ └────────┘ └────────┘
              │          │          │
              └──────────┴──────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  MongoDB Atlas  │
              │  (Replica Set)  │
              └─────────────────┘
```

## Environment Setup

### Development
- Local Node.js server
- Local MongoDB instance
- Development dependencies (nodemon)

### Production
- Containerized deployment (Docker)
- Managed MongoDB (MongoDB Atlas)
- Environment-based configuration
- SSL/TLS encryption
- Rate limiting and security middleware
