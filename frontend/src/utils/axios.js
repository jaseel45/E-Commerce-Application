// src/utils/axios.js (create this file)
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // VITE_API_BASE_URL
  withCredentials: true,
});

export default instance;
