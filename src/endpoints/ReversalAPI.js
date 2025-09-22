//Reversal API
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

//function to initiate reversal
const initiateReversal = async (transactionID, amount, receiverParty, receiverIdentifierType, remarks, occasion) => {
    const accessToken = await getAccessToken();

    const payload = {
        "Initiator": process.env.INITIATOR_NAME,
        "SecurityCredential": process.env.SECURITY_CREDENTIAL,
        "CommandID": "TransactionReversal",
        "TransactionID      ": transactionID,
        "Amount": amount,
        "ReceiverParty": receiverParty,
        "RecieverIdentifierType": receiverIdentifierType,
        "ResultURL": process.env.REVERSAL_RESULT_URL,
        "QueueTimeOutURL": process.env.REVERSAL_TIMEOUT_URL,
        "Remarks": remarks,
        "Occasion": occasion
    };

     try {
        const response = await axios.post(`${baseURL}/mpesa/reversal/v1/request`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        console.log('Reversal API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Reversal API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.errorMessage || 'Reversal failed');
    }
};

export { initiateReversal };