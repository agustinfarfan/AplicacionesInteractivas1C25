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

export const addCoupon = async (userId, nombre) => {
  const response = await axiosInstance.put(`/user/${userId}/cart/addCoupon`, {
    nombreCupon: nombre
  });
  return response.data;
};

export const finalize = async (userId, data) => {
  const response = await axiosInstance.post(`/user/${userId}/cart/finalize`, data);
  return response.data;
};
