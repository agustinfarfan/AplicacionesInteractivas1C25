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

export const updateCategory = async (token, nombre, descripcion, id) => {

  console.log("Infor recibida en updateCategory de la API:", nombre, descripcion, id);


  const response = await axiosInstance.put(`/categories/${id}`, 
    {
      nombre: nombre,
      descripcion: descripcion,
    }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
  });
  return response.data;
};