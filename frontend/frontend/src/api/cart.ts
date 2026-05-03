import api from './axios';

export const getCart = (userId: number) => api.get(`/cart/${userId}`);
export const addToCart = (userId: number, foodId: number, quantity: number) =>
  api.post(`/cart/add?userId=${userId}&foodId=${foodId}&quantity=${quantity}`);
export const removeFromCart = (cartItemId: number) => api.delete(`/cart/remove/${cartItemId}`);
export const clearCart = (userId: number) => api.delete(`/cart/clear/${userId}`);