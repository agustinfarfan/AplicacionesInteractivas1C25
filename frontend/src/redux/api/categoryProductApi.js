import axios from 'axios';

const API_URL = 'http://localhost:4002'; 

export const fetchProductsByCategory = async (categoryId) => {
  const res = await axios.get(`${API_URL}/productos/categoria/${categoryId}`);
  return res.data;
};