import axios from 'axios';


const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});


export const getUserLogged = async (token) => {
  const response = await axiosInstance.get(`/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};