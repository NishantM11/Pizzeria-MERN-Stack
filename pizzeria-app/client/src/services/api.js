import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchPizzas = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/pizzas`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching pizzas:', error);
        throw error;
    }
};

export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchUserOrders = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};