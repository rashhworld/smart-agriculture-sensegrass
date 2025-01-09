import API from './config';
import { toast } from 'react-hot-toast';

export const createField = async (fieldData) => {
    try {
        const response = await API.post('/fields', fieldData);
        toast.success("Field created successfully");
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Something went wrong');
        throw error.response?.data || { msg: 'Something went wrong' };
    }
};

export const getFields = async () => {
    try {
        const response = await API.get('/fields');
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to load fields');
        throw error.response?.data || { msg: 'Something went wrong' };
    }
};

export const updateField = async (id, fieldData) => {
    try {
        const response = await API.put(`/fields/${id}`, fieldData);
        toast.success("Field updated successfully");
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to update field');
        throw error.response?.data || { msg: 'Something went wrong' };
    }
};

export const deleteField = async (id) => {
    try {
        const response = await API.delete(`/fields/${id}`);
        toast.success("Field deleted successfully");
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to delete field');
        throw error.response?.data || { msg: 'Something went wrong' };
    }
}; 