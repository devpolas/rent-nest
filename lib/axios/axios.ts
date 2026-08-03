import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
