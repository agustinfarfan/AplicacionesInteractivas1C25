import axios from 'axios';

const BASE_URL = "http://localhost:4002";
const AUTH_TOKEN = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});


export const getUserCart = async (userId) => {
  const response = await axiosInstance.get(`/user/${userId}/cart`);
  return response.data;
};

export const addProduct = async (userId, productoId, cantidad) => {
  const response = await axiosInstance.put(`/user/${userId}/cart/addProduct`, {
    productId: productoId,
    cantidad: cantidad,
  });
  return response.data;
};

export const removeProduct = async (userId, productoId, cantidad) => {
  const response = await axiosInstance.put(`/user/${userId}/cart/removeProduct`, {
    productId: productoId,
    cantidad: cantidad,
  });
  return response.data;
};
