import config from "@/config/server/server";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
