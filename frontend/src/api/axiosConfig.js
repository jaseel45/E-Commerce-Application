// src/api/axiosConfig.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  withCredentials: true,
});
// Optional: Global error handling interceptor
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', err.response || err.message);
    return Promise.reject(err);
  }
);

export default API;
