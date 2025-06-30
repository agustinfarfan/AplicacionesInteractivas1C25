import axios from 'axios';

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json"
  },
});

export const register = async (data) => {
  const response = await axiosInstance.post(`/api/v1/auth/register`, data);
  return response.data;
};


export const login = async (email, password) => {
  const response = await axiosInstance.post(`/api/v1/auth/authenticate`, {
    email: email,
    password: password
  });
  return response.data;
};
