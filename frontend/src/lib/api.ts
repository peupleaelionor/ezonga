import axios, { AxiosError } from 'axios';
import { useAuthStore } from './store';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().logout();
      toast.error('Session expirée. Veuillez vous reconnecter.');
      window.location.href = '/auth/login';
    } else if (error.response?.status === 500) {
      toast.error('Erreur serveur. Veuillez réessayer plus tard.');
    } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      toast.error('Problème de connexion. Vérifiez votre connexion internet.');
    } else if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      toast.error((error.response.data as any).message);
    } else {
      toast.error('Une erreur inattendue s\'est produite.');
    }
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
const retryRequest = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
};

export const authAPI = {
  register: (data: any) => retryRequest(() => api.post('/auth/register', data)),
  login: (data: any) => retryRequest(() => api.post('/auth/login', data)),
  getMe: () => retryRequest(() => api.get('/auth/me')),
};

export const profileAPI = {
  getFeed: () => retryRequest(() => api.get('/profiles/feed')),
  updateMe: (data: any) => retryRequest(() => api.put('/profiles/me', data)),
};

export const matchAPI = {
  swipe: (targetId: string, action: string) => retryRequest(() => api.post('/matches/swipe', { targetId, action })),
  list: () => retryRequest(() => api.get('/matches/list')),
};

export const messageAPI = {
  getConversations: () => retryRequest(() => api.get('/messages/conversations')),
  getMessages: (otherUserId: string) => retryRequest(() => api.get(`/messages/${otherUserId}`)),
  sendMessage: (otherUserId: string, content: string) => retryRequest(() => api.post(`/messages/${otherUserId}`, { content })),
};