import axios from 'axios';

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});


export const getUserCart = async (token, userId) => {
  const response = await axiosInstance.get(`/user/${userId}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const addProduct = async (token, userId, productoId, cantidad) => {
  const response = await axiosInstance.put(
    `/user/${userId}/cart/addProduct`,
    {
      productId: productoId,
      cantidad: cantidad,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const removeProduct = async (token, userId, productoId, cantidad) => {
  const response = await axiosInstance.put(
    `/user/${userId}/cart/removeProduct`,
    {
      productId: productoId,
      cantidad: cantidad,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const addCoupon = async (token, userId, nombre) => {
  const response = await axiosInstance.put(
    `/user/${userId}/cart/addCoupon`,
    {
      nombreCupon: nombre,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const finalize = async (token, userId, data) => {
  const response = await axiosInstance.post(
    `/user/${userId}/cart/finalize`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
