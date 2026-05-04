import api from './axios';

export const makePayment = (orderId: number) =>
  api.post(`/payments/${orderId}`);
