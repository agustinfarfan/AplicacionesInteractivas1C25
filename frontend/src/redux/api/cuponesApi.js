// src/redux/api/cuponesApi.js

import axios from 'axios';

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
  withCredentials: true,
});

export const fetchAllCupones = async () => {
  const response = await axiosInstance.get("/coupon");
  return response.data;
};

export const createCupon = async (data, token) => {
  const response = await axiosInstance.post("/coupon", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateCupon = async (data, token) => {
  const response = await axiosInstance.put(`/coupon/${data.id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteCupon = async (id, token) => {
  const response = await axiosInstance.delete(`/coupon/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
