import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  
  const token = localStorage.getItem("token");
 
  const isLoginRequest = config.url?.includes("/api/v2/auth") || config.url?.endsWith("/api/v2/usuarios");
 
  
  if (token != undefined && token != 'undefined' && !isLoginRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
