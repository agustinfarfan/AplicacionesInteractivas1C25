import axios from "axios";

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

export const fetchProductos = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const deleteProducto = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

export const updateProducto = async (id, data) => {
  const response = await axiosInstance.put(`/products/${id}`, data);
  return response.data;
};
