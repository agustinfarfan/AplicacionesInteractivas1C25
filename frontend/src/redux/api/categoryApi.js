import axios from 'axios';

const API_URL = 'http://localhost:4002'; 

export const getAllCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/categories/${id}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}/categories`, categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`${API_URL}/categories/${id}`);
};