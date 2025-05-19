import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  
  const token = localStorage.getItem("token");

  const isLoginRequest = config.url?.includes("/login");

  if (token && !isLoginRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
