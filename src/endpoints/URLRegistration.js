//URL Registration
import axios from 'axios'
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

//function to register url
const registerURL = async () => {
    const accessToken = await getAccessToken();

    const payload = {
        "ShortCode": process.env.SHORT_CODE,
        "ResponseType": "Completed",
        "ConfirmationURL": process.env.CONFIRMATION_URL,
        "ValidationURL": process.env.VALIDATION_URL
    };

     try {
        const response = await axios.post(`${baseURL}/mpesa/c2b/v1/registerurl`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        console.log('URL Registration API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('URL Registration API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.errorMessage || 'URL Registration failed');
    }
};

export { registerURL };