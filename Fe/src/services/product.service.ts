import { ProductPayload } from "@/types/product.type";
import api from "../lib/axios";

/* ================== GET PRODUCTS ================== */
export const getProductS = (payload: { page: number }) =>
  api.get(`/products${payload.page ? `?page=${payload.page}` : ""}`);

/* ================== ADD PRODUCTS ================== */
export const addProduct = (payload: ProductPayload) =>
  api.post("/products/", payload);

/* ================== EDIT PRODUCTS ================== */
export const editProduct = (payload: ProductPayload) => {
  const { id, ...body } = payload;
  return api.put(`/products/${id}`, body);
};

/* ================== REMOVE PRODUCTS ================== */
export const removeProduct = (payload: { id: string }) => {
  const { id } = payload;
  return api.delete(`/products/${id}`);
};

/* ================== GET CATEGORY ================== */
export const getCategories = () => api.get(`/categories`);
