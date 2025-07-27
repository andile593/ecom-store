// src/lib/api/axios.ts
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // Or your actual backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for auth
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default API;
