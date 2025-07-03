import axios from 'axios';


const BASE_URL = "http://localhost:4002";
const AUTH_TOKEN = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});


export const getUserLogged = async () => {
  console.log(localStorage.getItem("token"));
  
  const response = await axiosInstance.get(`/user/me`);
  return response.data;
};