# Mpesa Api Tests

## Mpesa B2C test


```bash
curl -X POST http://localhost:3000/api/b2c/pay \
  -H "Content-Type: application/json" \
  -d '{"phone": "254768744700", "amount": 100}'
```