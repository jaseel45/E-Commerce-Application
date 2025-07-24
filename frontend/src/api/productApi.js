// src/api/productApi.js
import API from './axiosConfig'; // assuming axiosConfig is set with baseURL and withCredentials

export const fetchAllProducts = async () => API.get('/api/products');
export const createProduct = async (productData) => API.post('/api/products', productData);
export const updateProduct = async (id, productData) => API.put(`/api/products/${id}`, productData);
export const deleteProduct = async (id) => API.delete(`/api/products/${id}`);
