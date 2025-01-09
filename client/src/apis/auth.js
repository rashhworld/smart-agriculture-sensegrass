import API from './config';
import { toast } from 'react-hot-toast';

export const registerUser = async (userData) => {
    try {
        const response = await API.post('/register', userData);
        toast.success(response.data.msg);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || "Registration failed");
        throw error.response?.data || { msg: 'Something went wrong' };
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await API.post('/login', userData);
        toast.success(response.data.msg);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || "Login failed");
        throw error.response?.data || { msg: 'Something went wrong' };
    }
};