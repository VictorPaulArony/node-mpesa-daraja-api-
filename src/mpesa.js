import express, { json } from 'express';

import { configDotenv } from 'dotenv'
import { initiateMpesaPayment } from './endpoints/STKPush.js';
import { initiateB2CPayment } from './endpoints/B2CQuery.js';
import { initiateB2BPayment } from './endpoints/B2BQuery.js';
import { initiateC2BPayment } from './endpoints/C2BQuery.js';
import { initiateReversal } from './endpoints/ReversalAPI.js';
import { registerURL } from './endpoints/URLRegistration.js';
configDotenv({ path: './.env' });

const app = express();
app.use(json());

// STK Push Endpoint
app.post('/api/pay', async (req, res) => {
    const { phone, amount } = req.body;

    try {
        const response = await initiateMpesaPayment(phone, amount);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// B2C Payment Endpoint
app.post('/api/b2c/pay', async (req, res) => {
    const { phone, amount } = req.body;

    try {
        const response = await initiateB2CPayment(phone, amount);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// B2B Payment Endpoint
app.post('/api/b2b/pay', async (req, res) => {
    const { phone, amount } = req.body;

    try {
        const response = await initiateB2BPayment(phone, amount);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// C2B Payment Endpoint
app.post('/api/c2b/pay', async (req, res) => {
    const { phone, amount } = req.body;

    try {
        const response = await initiateC2BPayment(phone, amount);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reversal Endpoint
app.post('/api/reversal', async (req, res) => {
    const { transactionID, amount, receiverParty, remarks } = req.body;

    try {
        const response = await initiateReversal(transactionID, amount, receiverParty, remarks);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// URL Registration Endpoint
app.post('/api/register/url', async (req, res) => {
    try {
        const response = await registerURL();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Balance Inquiry Endpoint
app.post('/api/balance/inquiry', async (req, res) => {
    try {
        const response = await initiateBalanceInquiry();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Transaction Status Endpoint
app.post('/api/transaction/status', async (req, res) => {
    try {
        const response = await initiateTransactionStatus();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ResultURL endpoint for B2B callback
app.post('/api/b2b/result', (req, res) => {
    console.log('B2B Result received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// TimeoutURL endpoint for B2B timeout
app.post('/api/b2b/timeout', (req, res) => {
    console.log('B2B Timeout received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

//// ResultURL endpoint for C2B callback
app.post('/api/c2b/result', (req, res) => {
    console.log('C2B Result received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});
// TimeoutURL endpoint for C2B timeout
app.post('/api/c2b/timeout', (req, res) => {
    console.log('C2B Timeout received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// ResultURL endpoint for B2C callback
app.post('/api/b2c/result', (req, res) => {
    console.log('B2C Result received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// TimeoutURL endpoint for B2C timeout
app.post('/api/b2c/timeout', (req, res) => {
    console.log('B2C Timeout received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});