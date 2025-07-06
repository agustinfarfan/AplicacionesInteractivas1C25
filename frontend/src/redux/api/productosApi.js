import axios from "axios";

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

export const fetchProductos = async () => {
  const response = await axiosInstance.get("/productos");
  return response.data;
};

export const createProducto = async (data, token) => {
  const response = await axiosInstance.post("/productos", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const deleteProducto = async (id, token) => {
  const response = await axiosInstance.delete(`/productos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const updateProducto = async (id, data) => {
  const response = await axiosInstance.put(`/productos/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
