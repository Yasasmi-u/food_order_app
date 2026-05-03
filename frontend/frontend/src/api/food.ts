import api from './axios';

export const getAllFoods = () => api.get('/foods');
export const getFoodsByCategory = (categoryId: number) => api.get(`/foods/category/${categoryId}`);
export const addFood = (data: any) => api.post('/foods', data);
export const deleteFood = (id: number) => api.delete(`/foods/${id}`);