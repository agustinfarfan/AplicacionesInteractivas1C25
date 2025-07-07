import axios from 'axios';

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});


export const getAllPedidos = async (token) => {
  const response = await axiosInstance.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};


export const getPedidoById = async (token, id) => {
  const response = await axiosInstance.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};


export const getPedidosByUserId = async (token, userId) => {
  const response = await axiosInstance.get(`/user/${userId}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};


export const createPedido = async (token, pedido) => {
  const response = await axiosInstance.post('/orders', pedido, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};


export const updatePedido = async (token, id, pedido) => {
  const response = await axiosInstance.put(`/orders/${id}`, pedido, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};


export const deletePedido = async (token, id) => {
  const response = await axiosInstance.delete(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
