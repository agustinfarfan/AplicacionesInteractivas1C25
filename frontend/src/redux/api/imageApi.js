import axios from "axios";

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    "http://localhost:4002/images/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const getImage = async (imagen) => {
  const response = await axiosInstance.get(`/images/${imagen}`, {
  });
  return response.data;
};