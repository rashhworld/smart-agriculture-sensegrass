import API from './config';
import { toast } from 'react-hot-toast';

export const createPaymentIntent = async (amount) => {
    try {
        const response = await API.post('/payments/create-payment-intent', { amount });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to create payment intent');
        throw error;
    }
};

export const saveTransaction = async (transactionData) => {
    try {
        const response = await API.post('/payments/save-transaction', transactionData);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to save transaction');
        throw error;
    }
};