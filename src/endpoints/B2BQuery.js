import axios from 'axios'
// import express from 'express'
import { configDotenv } from 'dotenv'
configDotenv('./.env');


const baseURL = process.env.BASE_URL;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;


// function to get accestoken
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

//function to enable and iniatiate b2b payment
const initiateB2BPayment = async (phoneNumber, amount) => {
    const accessToken = await getAccessToken();

    const payload = {
        Initiator: process.env.INITIATOR_NAME,
        SecurityCredential: process.env.SECURITY_CREDENTIAL,
        CommandID: 'BusinessToBusinessTransfer', 
        Amount: amount,
        PartyA: process.env.SENDER_SHORT_CODE, 
        PartyB: process.env.RECEIVER_SHORT_CODE, // Business receiving the funds
        Remarks: 'B2B Payment',
        QueueTimeOutURL: process.env.B2B_TIMEOUT_URL,
        ResultURL: process.env.B2B_RESULT_URL,
        AccountReference: 'TestB2B',
    };

     try {
        const response = await axios.post(`${baseURL}/mpesa/b2b/v1/paymentrequest`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        console.log('B2B API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('B2B API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.errorMessage || 'B2B Payment failed');
    }
};

export { initiateB2BPayment };