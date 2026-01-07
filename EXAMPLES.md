# API Examples

This file contains example requests for testing the BTY Backend API endpoints.

## Prerequisites
Make sure the server is running on http://localhost:3000 and MongoDB is connected.

---

## Customer Endpoints

### 1. Create a Customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

### 2. Get All Customers
```bash
curl -X GET http://localhost:3000/api/customers
```

### 3. Get Customer by ID
```bash
curl -X GET http://localhost:3000/api/customers/{customerId}
```

### 4. Update Customer
```bash
curl -X PUT http://localhost:3000/api/customers/{customerId} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "phone": "+0987654321"
  }'
```

### 5. Delete Customer
```bash
curl -X DELETE http://localhost:3000/api/customers/{customerId}
```

---

## Order Endpoints

### 1. Create an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "{customerId}",
    "orderNumber": "ORD-20240101-001",
    "items": [
      {
        "productName": "Laptop",
        "quantity": 1,
        "price": 999.99,
        "subtotal": 999.99
      },
      {
        "productName": "Mouse",
        "quantity": 2,
        "price": 25.00,
        "subtotal": 50.00
      }
    ],
    "totalAmount": 1049.99,
    "status": "pending",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }'
```

### 2. Get All Orders
```bash
curl -X GET http://localhost:3000/api/orders
```

### 3. Get Order by ID
```bash
curl -X GET http://localhost:3000/api/orders/{orderId}
```

### 4. Get Orders by Customer
```bash
curl -X GET http://localhost:3000/api/orders/customer/{customerId}
```

### 5. Update Order Status
```bash
curl -X PUT http://localhost:3000/api/orders/{orderId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

### 6. Delete Order
```bash
curl -X DELETE http://localhost:3000/api/orders/{orderId}
```

---

## Transaction Endpoints

### 1. Create a Transaction
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "{customerId}",
    "orderId": "{orderId}",
    "transactionNumber": "TXN-20240101-001",
    "amount": 1049.99,
    "paymentMethod": "credit_card",
    "status": "completed",
    "description": "Payment for order ORD-20240101-001"
  }'
```

### 2. Get All Transactions
```bash
curl -X GET http://localhost:3000/api/transactions
```

### 3. Get Transaction by ID
```bash
curl -X GET http://localhost:3000/api/transactions/{transactionId}
```

### 4. Get Transactions by Customer
```bash
curl -X GET http://localhost:3000/api/transactions/customer/{customerId}
```

### 5. Get Transactions by Order
```bash
curl -X GET http://localhost:3000/api/transactions/order/{orderId}
```

### 6. Update Transaction Status
```bash
curl -X PUT http://localhost:3000/api/transactions/{transactionId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "refunded"
  }'
```

### 7. Delete Transaction
```bash
curl -X DELETE http://localhost:3000/api/transactions/{transactionId}
```

---

## Complete Workflow Example

Here's a complete workflow showing how to create a customer, place an order, and process a transaction:

```bash
# Step 1: Create a customer
CUSTOMER_RESPONSE=$(curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice.smith@example.com",
    "phone": "+1122334455",
    "address": {
      "street": "456 Oak Ave",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90001",
      "country": "USA"
    }
  }')

echo "Customer created: $CUSTOMER_RESPONSE"

# Extract customer ID from response (you'll need to parse JSON)
# CUSTOMER_ID="..."

# Step 2: Create an order for the customer
ORDER_RESPONSE=$(curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d "{
    \"customerId\": \"$CUSTOMER_ID\",
    \"orderNumber\": \"ORD-$(date +%Y%m%d)-001\",
    \"items\": [
      {
        \"productName\": \"Product A\",
        \"quantity\": 2,
        \"price\": 50.00,
        \"subtotal\": 100.00
      }
    ],
    \"totalAmount\": 100.00,
    \"status\": \"pending\",
    \"shippingAddress\": {
      \"street\": \"456 Oak Ave\",
      \"city\": \"Los Angeles\",
      \"state\": \"CA\",
      \"zipCode\": \"90001\",
      \"country\": \"USA\"
    }
  }")

echo "Order created: $ORDER_RESPONSE"

# Extract order ID from response
# ORDER_ID="..."

# Step 3: Create a transaction for the order
TRANSACTION_RESPONSE=$(curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d "{
    \"customerId\": \"$CUSTOMER_ID\",
    \"orderId\": \"$ORDER_ID\",
    \"transactionNumber\": \"TXN-$(date +%Y%m%d)-001\",
    \"amount\": 100.00,
    \"paymentMethod\": \"credit_card\",
    \"status\": \"completed\",
    \"description\": \"Payment for order\"
  }")

echo "Transaction created: $TRANSACTION_RESPONSE"

# Step 4: Update order status to completed
curl -X PUT http://localhost:3000/api/orders/$ORDER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

---

## Notes

- Replace `{customerId}`, `{orderId}`, and `{transactionId}` with actual IDs from your database
- All timestamps are automatically generated by the system
- Status fields have predefined enum values:
  - Order status: `pending`, `processing`, `completed`, `cancelled`
  - Transaction status: `pending`, `completed`, `failed`, `refunded`
  - Payment methods: `credit_card`, `debit_card`, `paypal`, `bank_transfer`, `cash`
