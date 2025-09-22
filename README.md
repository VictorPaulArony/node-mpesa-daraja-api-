# M-Pesa Daraja API Integration

A comprehensive `Node` application for integrating with Safaricom's M-Pesa Daraja API. This application provides RESTful endpoints for various M-Pesa services including STK Push, B2C, B2B, C2B, and transaction status queries.

## Features
    STK Push - Initiate Lipa Na M-Pesa Online payments
    B2C Payments - Business to Customer transactions
    B2B Payments - Business to Business transactions
    C2B Simulation - Customer to Business transactions
    Transaction Status - Check payment status
    Balance Inquiry - Account balance checks
    Reversal API - Transaction reversals
    URL Registration - Register validation and confirmation URLs
    Webhook Support - Handle M-Pesa callbacks


### install mpesa node 

```bash
npm install mpesa-node
```

## API Endpoints

Below are the cURL commands to test the available endpoints.

### STK Push (Lipa Na M-Pesa Online)

Initiates a Lipa Na M-Pesa Online payment.

```bash
curl -X POST http://localhost:3000/api/pay \
-H "Content-Type: application/json" \
-d '{
    "phone": "2547xxxxxxxx",
    "amount": 1
}'
```

### B2C Payment

Initiates a Business to Customer payment.

```bash
curl -X POST http://localhost:3000/api/b2c/pay \
-H "Content-Type: application/json" \
-d '{
    "phone": "2547xxxxxxxx",
    "amount": 10
}'
```

### B2B Payment

Initiates a Business to Business payment.

```bash
curl -X POST http://localhost:3000/api/b2b/pay \
-H "Content-Type: application/json" \
-d '{
    "phone": "2547xxxxxxxx",
    "amount": 100
}'
```

### C2B Payment

Initiates a Customer to Business payment.

```bash
curl -X POST http://localhost:3000/api/c2b/pay \
-H "Content-Type: application/json" \
-d '{
    "phone": "2547xxxxxxxx",
    "amount": 10
}'
```

### Balance Inquiry

Checks the account balance.

```bash
curl -X POST http://localhost:3000/api/balance/inquiry
```

### Transaction Status

Checks the status of a transaction.

```bash
curl -X POST http://localhost:3000/api/transaction/status
```

### Reversal

Reverses a transaction.

```bash
curl -X POST http://localhost:3000/api/reversal \
-H "Content-Type: application/json" \
-d '{
    "transactionID": "your_transaction_id",
    "amount": 10,
    "receiverParty": "600xxx",
    "receiverIdentifierType": "11",
    "remarks": "test",
    "occasion": "test"
}'
```

### URL Registration

Registers the validation and confirmation URLs.

```bash
curl -X POST http://localhost:3000/api/register-url
```