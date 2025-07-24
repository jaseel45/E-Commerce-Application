// src/utils/axios.js (create this file)
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export default instance;
