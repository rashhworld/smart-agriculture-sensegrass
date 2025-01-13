import API from './config';
import { toast } from 'react-hot-toast';

// Fetch field analysis for a given fieldId
export const getFieldAnalysis = async (fieldId) => {
    try {
        const response = await API.get(`/ai/analysis/${fieldId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to load field analysis');
        throw error.response?.data || { msg: 'Something went wrong' };
    }
}; 