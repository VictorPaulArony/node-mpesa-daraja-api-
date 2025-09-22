//Balance Inquiry
import express from 'express';
import axios from 'axios';
import { configDotenv } from 'dotenv';
configDotenv({ path: './.env' });

const app = express();
app.use(express.json());

const baseURL = process.env.BASE_URL;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

// Function to get access token
const getAccessToken = async () => {
    try {
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        const response = await axios.get(`${baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: {
                Authorization: `Basic ${auth}`,
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
        throw new Error('Failed to obtain access token');
    }
};

// Function to initiate balance inquiry
const initiateBalanceInquiry = async () => {
    const accessToken = await getAccessToken();

    const payload = {
        "Initiator": process.env.INITIATOR_NAME,
        "SecurityCredential": process.env.SECURITY_CREDENTIAL,
        "CommandID": "AccountBalance",
        "PartyA": process.env.SENDER_SHORT_CODE,
        "IdentifierType": "4",
        "Remarks": "Balance Inquiry",
        "QueueTimeOutURL": process.env.BALANCE_INQUIRY_TIMEOUT_URL,
        "ResultURL": process.env.BALANCE_INQUIRY_RESULT_URL
    };

    try {
        const response = await axios.post(`${baseURL}/mpesa/accountbalance/v1/query`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        console.log('Balance Inquiry API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Balance Inquiry API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.errorMessage || 'Balance Inquiry failed');
    }
};

export { initiateBalanceInquiry };