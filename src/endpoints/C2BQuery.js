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
//function to enable and iniatiate c2b payment
const initiateC2BPayment = async (phoneNumber, amount) => {
    const accessToken = await getAccessToken();
    
    const payload = {
        ShortCode: process.env.SHORT_CODE,
        CommandID: 'CustomerPayBillOnline',
        Amount: amount,
        Msisdn: phoneNumber,
        BillRefNumber: 'Test123',
    };

     try {
        const response = await axios.post(`${baseURL}/mpesa/c2b/v1/simulate`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        console.log('C2B API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('C2B API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.errorMessage || 'C2B Payment failed');
    }
};

export { initiateC2BPayment };