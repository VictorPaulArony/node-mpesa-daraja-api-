//Webhook Support
import express from 'express';
const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    res.status(200).send('Webhook received');
});

export { app as webhookApp };