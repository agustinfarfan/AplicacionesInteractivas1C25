import axios from "axios";

const BASE_URL = "http://localhost:4002";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`, {
    headers: { ...getAuthHeader(), accept: "application/json" },
  });
  return response.data;
};

export const createCategory = async ({ nombre, descripcion }) => {
  const response = await axios.post(
    `${BASE_URL}/categories`,
    { name: nombre, description: descripcion },
    { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
  );
  return response.data;
};

export const updateCategory = async ({ id, nombre, descripcion }) => {
  const response = await axios.put(
    `${BASE_URL}/categories/${id}`,
    { name: nombre, description: descripcion },
    { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
  );
  return response.data;
};

