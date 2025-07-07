import axios from "axios";

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

export const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const deleteCategories = async (id, token) => {
  const response = await axiosInstance.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};