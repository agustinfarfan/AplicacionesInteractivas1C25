import axios from "axios";

const BASE_URL = "http://localhost:4002";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

export const editAddress = async (token, id, data) => {
    const response = await axiosInstance.put(
      `/shipping-addresses/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
}

export const createAddress = async (token, userId, data) => {
  const response = await axiosInstance.post(
    `/shipping-addresses/user/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const deleteAddress = async (token, id) => {
  const response = await axiosInstance.delete(`/shipping-addresses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};