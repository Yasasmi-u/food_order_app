import api from './axios';

export const login = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

export const signup = (username: string, password: string, role: string) =>
  api.post('/auth/signup', { username, password, role });