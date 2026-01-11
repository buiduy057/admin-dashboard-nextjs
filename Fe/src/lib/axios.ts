/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 👈 dùng cookie (JWT)
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response: AxiosResponse) => response.data, // 👈 chỉ trả data
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    console.log("error", error);
    if (error.response?.status === 403) {
      toast.error("Bạn không có quyền truy cập chức năng này");
      return Promise.reject(error.response?.data);
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default api;
