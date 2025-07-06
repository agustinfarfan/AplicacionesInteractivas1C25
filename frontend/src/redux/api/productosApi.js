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

export const updateProducto = async (token, productData) => {
  const response = await axiosInstance.put(`/productos/${productData.id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
