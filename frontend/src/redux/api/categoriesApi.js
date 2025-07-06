import axios from "axios";

const BASE_URL = "http://localhost:4002";
const AUTH_TOKEN = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});


export const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

