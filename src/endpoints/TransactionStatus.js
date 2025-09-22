//Transaction Status
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

//function to check transaction status
const checkTransactionStatus = async (transactionID) => {
    const accessToken = await getAccessToken();

    const payload = {
        "Initiator": process.env.INITIATOR_NAME,
        "SecurityCredential": process.env.SECURITY_CREDENTIAL,
        "CommandID": "TransactionStatusQuery",
        "TransactionID": transactionID,
        "PartyA": process.env.SENDER_SHORT_CODE,
        "IdentifierType": "4",
        "ResultURL": process.env.TRANSACTION_STATUS_RESULT_URL,
        "QueueTimeOutURL": process.env.TRANSACTION_STATUS_TIMEOUT_URL,
        "Remarks": "Checking transaction status",
        "Occasion": "StatusCheck"
    };

     try {
        const response = await axios.post(`${baseURL}/mpesa/transactionstatus/v1/query`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        console.log('Transaction Status API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Transaction Status API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.errorMessage || 'Transaction Status check failed');
    }
};

export { checkTransactionStatus };