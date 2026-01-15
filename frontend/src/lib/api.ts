import axios from 'axios';
import { useAuthStore } from './store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const profileAPI = {
  getFeed: () => api.get('/profiles/feed'),
  updateMe: (data: any) => api.put('/profiles/me', data),
};

// CORRECTION ICI : On accepte maintenant 2 arguments séparés
export const matchAPI = {
  swipe: (targetId: string, action: string) => api.post('/matches/swipe', { targetId, action }),
  list: () => api.get('/matches/list'),
};

export const messageAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (otherUserId: string) => api.get(`/messages/${otherUserId}`),
};