import api from './axios';

export const placeOrder = (userId: number) => api.post(`/orders/place/${userId}`);
export const getOrdersByUser = (userId: number) => api.get(`/orders/${userId}`);