import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API!,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["X-Client-Session"] = JSON.stringify({
    // client-side metadata you explicitly want to send
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
  });

  return config;
});

export default axiosInstance;
