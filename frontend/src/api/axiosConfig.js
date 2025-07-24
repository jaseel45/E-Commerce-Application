// src/api/axiosConfig.js
import axios from 'axios';

// Utility function to get cookie value by name
const getCookie = (name) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  return cookieValue ? cookieValue.split('=')[1] : null;
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});


// Request interceptor to attach JWT token from cookie
API.interceptors.request.use(
  (config) => {
    const token = getCookie('jwt');

    console.log("token", token, document.cookie)
    console.log("ALL COOKS",  document.cookie)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handling
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', err.response || err.message);
    return Promise.reject(err);
  }
);

export default API;
